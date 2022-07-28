import MessageService from '../models/MessageService.js'
import asyncHandler from 'express-async-handler'

const findAllMessageServices = asyncHandler( async (req,res) => {
    const kurum_id = { kurum_id: req.params.kurum_id }
    const doc = await MessageService.find(kurum_id).populate('message_api')
    return res.status(200).json(doc);
})

const update = async (req,res) => {
    const id = { _id: req.params.id }

    const doc = await MessageService.findOneAndUpdate(id, req.body, {new: true});
    return res.status(200).json(doc);   
}

const create = async (req,res) => {
    const doc = await MessageService.create(req.body)
    return res.status(200).json(doc);
}

const _delete = async (req,res) =>{
    const result = await MessageService.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
}


export { create, findAllMessageServices, update, _delete }