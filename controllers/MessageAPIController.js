import MessageAPI from '../models/MessageAPI.js'
import asyncHandler from 'express-async-handler'

const findAllMessageAPI = asyncHandler( async (req,res) => {
    const doc = await MessageAPI.find()
    return res.status(200).json(doc);
})

const update = async (req,res) => {
    const id = { _id: req.params.id }

    const doc = await MessageAPI.findOneAndUpdate(id, req.body, {new: true});
    return res.status(200).json(doc);   
}

const create = async (req,res) => {
    const doc = await MessageAPI.create(req.body)
    return res.status(200).json(doc);
}

const _delete = async (req,res) =>{
    const result = await MessageAPI.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
}


export { create, findAllMessageAPI, update, _delete }