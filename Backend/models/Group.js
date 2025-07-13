const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    members: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",required: true 
        }
    ],
    groupPic: { 
        type: String, 
        default: ''
    },
    lists: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'List'
        } //jb bhi populate krna ho toh kiska ref lena h???
    ],
}, {timestamps: true });

module.exports = mongoose.model('Group', groupSchema);