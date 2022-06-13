//import Kurum from '../models/Kurum.js'

import mongoose from "mongoose";

const login = async (req,res) =>{

}


const create = async (req,res) =>{    
    try {
        const { id: _id } = req.params;

        if(mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No item wit that id')

        const projectExisting = await Project.findById(id);
        if (!projectExisting) {
            return res.status(404).json({ msg: "project not found" });
        }

        if (projectExisting.creator.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
        }

        const user = new User(req.id);
        await user.save();
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).send("there was an error");
    }
}

const find = async (req,res) =>{

}

const update = async (req,res) =>{

}

const _delete = async (req,res) =>{ }

export {login, create, find, update, _delete}