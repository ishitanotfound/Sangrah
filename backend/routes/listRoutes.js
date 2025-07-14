const express = require("express");
const router = express.Router();
const List = require('../models/List')
const Group = require('../models/Group')
const verifyToken = require('../middleware/authMiddleware'); 
const User = require("../models/User");

// LISTS------------------------------------------------

// ADD NEW LIST
router.post('/', verifyToken, async (req, res) => { 
  try {
    const { name, fromDate, toDate } = req.body;

    if (!name) {    
      return res.status(400).json({ message: 'List name is required' });
    }

    const newList = new List({
      name,
      fromDate,
      toDate,
      createdBy: req.user.id,  // verifyToken se hoke aayi h
      group: null
    });

    const savedList = await newList.save();
    res.status(201).json({message: "New List created!", savedList}); //newList bhi daal sakte the
  } catch (err) {
    console.error('List creation failed:', err);
    res.status(500).json({ message: 'Server error while creating list' });
  }
});

// VIEW ALL LISTS
router.get('/', verifyToken, async (req, res) => { 
  try{
    const lists = await List.find({ createdBy: req.user.id, group: null }); 
    if(lists.length === 0) return res.status(404).json({error: "No lists found!"});
    res.status(200).json({message: 'All lists fetched!', lists}) // list of lists
  } catch (err) {
    console.log('Error in showing all lists', err);
    res.status(500).json({error: err.message});
  }    
})

// UPDATE A LIST
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    if ( !id ) return res.status(401).json({error : 'List ID not provided!'});

    const { name, fromDate, toDate } = req.body;

    const list = await List.findById(id).populate('group'); //list!
    if (!list) return res.status(404).json({ error: "List not found!" });

    if (list.group === null) {
      if (list.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized to modify this personal list!' });
      }
    } else {
      const memberIds = list.group.members;
      if (!memberIds.includes(req.user.id)) {
        return res.status(403).json({ error: 'Not authorized. Not a group member!' });
      }
    }

    if (name) list.name = name;
    if (fromDate) list.fromDate = fromDate;
    if (toDate) list.toDate = toDate;

    await list.save();

    if (list.group !== null) {
      return res.status(200).json({message: "Group List updated successfully!", list, group_id: list.group._id});
    }

    return res.status(200).json({message: "List updated successfully!", list});
  }
  catch (err) {
    console.log('Error in updating list', err);
    res.status(500).json({error: err.message});
  }
})

// DELETE A LIST
router.delete('/:id', verifyToken, async (req, res) => { 
    try {
        const { id } = req.params; // list_id
        if ( !id ) return res.status(401).json({error : 'List ID not provided!'});
        
        const list = await List.findById(id).populate('group');
        if (!list) return res.status(404).json({ error: "List not found!" }); //***

        if (list.group === null) {
          if (list.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to delete this personal list!' });
          }
        } else {
          const memberIds = list.group.members;
          if (!memberIds.includes(req.user.id)) {
            return res.status(403).json({ error: 'Not authorized. Not a group member!' });
          }
        }

        // Delete the list
        await List.deleteOne({ _id: id });

        // If list was part of a group, remove it from group.lists
        if (list.group) {
          await Group.updateOne(
            { _id: list.group._id },
            { $pull: { lists: list._id } }
          );
        }

        res.status(200).json({ message: 'Deleted list successfully'});
    } catch(err) {
        console.log("Error in deleting list", err);
        res.status(500).json({error: err.message});
    }
})

// TASKS--------------------------------------------------

// ADD NEW TASK
router.post('/:id', verifyToken, async (req, res) => {  
  try {
    const { id } = req.params;
    if(!id) return res.status(400).json({error: 'No list ID provided!'});           
        
    const { newTask } = req.body;
    if(!newTask) return res.status(400).json({error: 'No task provided!'});        
        
    const list = await List.findById(id).populate('group');

    if (!list) return res.status(404).json({ error: 'No list found!' });

    // CASE 1: personal list
    if (!list.group) {
      if (list.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: 'You are not authorized to modify this personal list!' });
      }
    }

    // CASE 2: group list
    if (list.group) {
      const group = list.group;

      if (!group.members.includes(req.user.id)) {
        return res.status(403).json({ error: 'You are not authorized. Not a group member!' });
      }
    }
            
    list.tasks.push( { title: newTask, completed: false } );
        
    await list.save();
        
    res.status(200).json({message: 'task added successfully', list});

  } catch (err) {
    console.log("Error in updating tasks of list!", err);
    res.status(500).json({error: err.message});
  }
})

// VIEW ALL TASKS
router.get('/:id', verifyToken, async (req, res) => {
  try{
    const { id } = req.params;
    if(!id) return res.status(400).json({error: 'No list ID provided!'});   

    const list = await List.findById(id).populate('group');

    if (!list) return res.status(404).json({ error: 'No list found!' });

    // CASE 1: personal list
    if (!list.group) {
      if (list.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: 'You are not authorized to modify this personal list!' });
      }
    }

    // CASE 2: group list
    if (list.group) {
      const group = list.group;

      if (!group.members.includes(req.user.id)) {
        return res.status(403).json({ error: 'You are not authorized. Not a group member!' });
      }
    }

    res.status(200).json({message: 'task fetched successfully', tasks:list.tasks, title:list.name});

  } catch (err) {
    console.log("Error in updating tasks of list!", err);
    res.status(500).json({error: err.message});
  }
})

// UPDATE TASKS - ( for checked toggle )
router.put('/:listId/:taskIndex', verifyToken, async (req, res) => {
  try {
    const { listId, taskIndex } = req.params;
    const { title, completed } = req.body;

    const list = await List.findById(listId).populate('group');

    if (!list) return res.status(404).json({ error: 'List not found!' });

    // personal list
    if (!list.group) {
      if (list.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: 'You are not authorized to modify this personal list!' });
      }
    }

    // group list
    if (list.group) {
      const group = list.group;
      const memberIds = group.members.map(m => m.toString());
      if (!memberIds.includes(req.user.id)) {
        return res.status(403).json({ error: 'You are not authorized. Not a group member!' });
      }
    }

    if (taskIndex < 0 || taskIndex >= list.tasks.length) {
      return res.status(400).json({ error: 'Invalid task index!' });
    }

    if (title !== undefined) list.tasks[taskIndex].title = title;
    if (completed !== undefined) list.tasks[taskIndex].completed = completed;

    await list.save();

    return res.status(200).json({ message: 'Task updated!', list });
  } catch (err) {
    console.log('Error updating task:', err);
    res.status(500).json({ error: err.message });
  }
});


// DELETE A TASK
router.delete('/:listId/:taskIndex', verifyToken, async (req, res) => {
  try {
    const { listId, taskIndex } = req.params;

    const list = await List.findById(listId).populate('group');

    if (!list) return res.status(404).json({ error: 'List not found!' });

    // personal list
    if (!list.group) {
      if (list.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ error: 'You are not authorized to modify this personal list!' });
      }
    }

    // group list
    if (list.group) {
      const group = list.group;
      const memberIds = group.members.map(m => m.toString());
      if (!memberIds.includes(req.user.id)) {
        return res.status(403).json({ error: 'You are not authorized. Not a group member!' });
      }
    }

    if (taskIndex < 0 || taskIndex >= list.tasks.length) {
      return res.status(400).json({ error: 'Invalid task index!' });
    }

    list.tasks.splice(taskIndex, 1); // remove the task

    await list.save();

    res.status(200).json({ message: 'Task deleted successfully', list });
  } catch (err) {
    console.log('Error in deleting task:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;