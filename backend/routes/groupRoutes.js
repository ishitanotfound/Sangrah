const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');
const List = require('../models/List');
const mongoose = require('mongoose');
const upload = require('../middleware/upload'); // import multer

const DEFAULT_GROUP_PIC = "https://res.cloudinary.com/dgm11piok/image/upload/v1752215643/flower_afq6zy.jpg";
 
// GROUPS------------------------------------------

// ADD NEW GROUP
router.post('/', verifyToken, upload.single('groupPic'), async (req, res) => { 
  try {
    const { name, memberUsernames = []} = req.body;
    if (!name) return res.status(400).json({ error: 'Group name is required' });

    const groupPic = req.file?.path || DEFAULT_GROUP_PIC; 

    const members = Array.isArray(memberUsernames) ?memberUsernames : [memberUsernames];

    // Step 1: Find users by username
    const users = await User.find({ username: { $in: members } });

    // Step 2: Check for invalid usernames
    if (users.length !== members.length) {
      const foundUsernames = users.map((u) => u.username);
      const invalidUsernames = members.filter((m) => !foundUsernames.includes(m));
      return res.status(400).json({ error: `Invalid usernames: ${invalidUsernames.join(', ')}` });
    }

    // Step 3: Get user IDs from found users
    const memberIds = users.map((user) => user._id);

    // Step 4: Add current user (creator) and make it unique
    const allMemberIds = [...new Set([...memberIds, req.user.id])];

    // Step 5: Create the group
    const group = new Group({
      name,
      createdBy: req.user.id,
      members: allMemberIds,
      groupPic,
    });

    const savedGroup = await group.save();

    res.status(201).json({ message: 'Group created successfully', group: savedGroup });
  } catch (err) {
    console.error('Error creating group:', err);
    res.status(500).json({ error: err.message });
  }
});

// VIEW ALL GROUPS
router.get('/', verifyToken, async (req, res) => { 
    try {
        const groups = await Group.find({ members: req.user.id }).populate('members', 'username');

        if ( groups.length === 0 ) return res.status(404).json({error: "No groups were found!"});

        return res.status(200).json({message: "All groups fetched!", groups});

    } catch ( err ) {
        console.log("error in displaying all groups", err);
        res.status(500).json({error: err.message});
    }
})

// UPDATE A GROUP
router.put('/:id', verifyToken, upload.single('groupPic'), async (req, res) => { 
    try {
        const { id } = req.params;
        if ( !id ) return res.status(401).json({error: "group ID not provided!"});

        const { name, memberUsernames=[] } = req.body;
        const groupPic = req.file?.path; 

        const group = await Group.findOne({_id: id});
        if ( !group ) return res.status(404).json({error: "group not found!"});

        if (name) group.name = name;
        if (memberUsernames) {
            const members = Array.isArray(memberUsernames) ? memberUsernames : [ memberUsernames ];
            const users = await User.find({username: {$in:members}});
            if (users.length !== members.length) {
                const validUsernames = users.map( (user) => user.username );
                const invalidUsernames = members.filter(u => !validUsernames.includes(u));
                return res.status(401).json({error: `Following invalid usernames entered: ${invalidUsernames}`});
            }
            const memberIds = users.map(u => u._id);
            group.members = [...new Set([...memberIds, req.user.id])];
        }
        if (groupPic) group.groupPic = groupPic;

        await group.save();

        return res.status(200).json({message: "Group updated successfully", group});
    
    } catch (err) {
        console.log("Error in updating group", err);
        res.status(500).json({error: err.message});
    }
})

// DELETE A GROUP
router.delete('/:id', verifyToken, async (req, res) => { 
    try {
        const { id } = req.params;
        if ( !id ) return res.status(400).json({error: "Group ID not provided!"});

        const lists = await List.deleteMany({group: id});

        const group = await Group.deleteOne({_id: id});
        if ( group.deletedCount === 0 ) return res.status(404).json({error: "Group not found!"});

        return res.status(200).json({message: "Group deleted successfully"});
    }
    catch (err) {
        console.log("error in deleting the group", err);
        res.status(500).json({error: err.message});
    }
})

// LISTS--------------------------------------------

// ADD NEW LIST TO GROUP
router.post('/:id', verifyToken, async (req, res) => { 
    try {
        const { id } = req.params;
        if ( !id ) return res.status(401).json({error: "Group ID not provided!"});
        const { name, fromDate, toDate } = req.body;        
        if ( !name ) return res.status(401).json({error: "Group name not provided!"});

        const newList = new List({
            name,
            fromDate,
            toDate,
            createdBy: req.user.id,
            group: id
        })

        const savedList = await newList.save();

        const group = await Group.findOne({_id: id});
        if ( !group ) return res.status(404).json({error: "Group not found!"});

        group.lists.push(savedList._id);
        await group.save();

        res.status(200).json({message:"list added to group successfully", list: savedList});

    } catch (err) {
        console.log("Error in adding a new list to a group!", err);
        res.status(500).json({error: err.message});
    }
})

// VIEW ALL LISTS OF A GROUP
router.get('/:id', verifyToken, async (req, res) => { 
    try {
        const { id } = req.params;
        if ( !id ) return res.status(401).json({error: "Group ID not provided!"});

        const group = await Group.findOne({ _id: id })
          .populate({
            path: 'lists',
            select: 'name fromDate toDate createdBy tasks',  
            populate: {
                path: 'createdBy',
                select: 'username'
            }
            });

        if (!group) return res.status(404).json({ error: "Group not found!" });

        if (!group.lists || group.lists.length === 0)
        return res.status(404).json({ error: "No lists found in this group!" });

        res.status(200).json({ message: "All lists of group fetched!", groupList: group.lists });

    } catch (err) {
        console.log("error in fetching all lists of the group!", err);
        res.status(500).json({error: err.message});
    }
})

module.exports = router;
