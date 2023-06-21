//import Kurum from '../models/Kurum.js'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import bcrypt from "bcrypt";

import mongoose from "mongoose";

const login = async (req,res) =>{
    try {
        const {email, password} = req.body
    
        const admin = await Admin.findOne({email});

        if(admin && (await bcrypt.compare(password, admin.password))) {
            return res.status(200).json({
                id: admin._id,
                email: admin.email,
                createdAt: admin.createdAt,
                token: generateToken(admin._id)
            })
        } else {
            return res.status(200).json({error: 'Doesn\'t match with the any admin.'})
        }
    } catch (error) {
        //res.json(error);
    }
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

const generateToken = (id) => {
    return jwt.sign({id}, "kurbanapp", {expiresIn: '30d'})
}

export {login, create, find, update, _delete}