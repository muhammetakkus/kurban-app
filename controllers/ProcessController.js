import Process from '../models/Process.js'
import asyncHandler from 'express-async-handler'

const processes = asyncHandler( async (req,res) => {
    const projects = await Process.find({kurum_id: req.params.kurum_id}).sort('process_order')
    return res.status(200).json(projects);
})

const find = async (req,res) => {
   try {
        // routerda /kurum/:kurum_id/project/:id şeklinde id parametresi var
        const project = await Process.findById({ 
            _id: req.params.id,
            kurum_id: req.params.kurum_id
        });
        res.status(200).json(project);
   } catch (error) {
        console.log(error);
        res.status(500).send(error);
   }
}

const update = async (req,res) => {
    const id = { _id: req.params.id }
    const { status, process_order, countProcess, kurum_id } = req.body

    if(status) {
        if(status === "up") {
            if(process_order === 0) return res.status(200).send(null)
            const beforeProcess = await Process.find( { $and: [ { kurum_id: kurum_id }, { process_order: (process_order-1) }  ] })
            if(beforeProcess.length === 0) return res.status(200).send(null)
            await Process.findByIdAndUpdate(beforeProcess[0]._id, {process_order: (beforeProcess[0].process_order+1) });
            req.body.process_order = req.body.process_order - 1
        }

        if(status === "down") {
            if(process_order === countProcess - 1) return res.status(200).send(null)
            const nextProcess = await Process.find( { $and: [ { kurum_id: kurum_id }, { process_order: (process_order+1) }  ] })
            if(nextProcess.length === 0) return res.status(200).send(null)
            await Process.findByIdAndUpdate(nextProcess[0]._id, {process_order: (nextProcess[0].process_order-1) });
            req.body.process_order = req.body.process_order + 1
        }
    }

    
    Process.findOneAndUpdate(id, req.body, {new: true}, (err, doc) => {
        return res.status(200).json(doc);
    })
}

const create = async (req,res) => {
    const {kurum_id, process_title} = req.body
    const isProcess = await Process.find( { $and: [ { kurum_id: kurum_id }, { process_title: process_title }  ] })
    const countProcesses = await Process.countDocuments({ kurum_id: kurum_id })
    
    
    if(isProcess !== null && isProcess.length > 0) {
        res.status(200).json({error: "Bu isimde bir işlem adımı mevcut.."});
    } else {
        const process = await Process.create({...req.body, process_order: countProcesses});
        res.status(200).json(process);
    }
}

const _delete = async (req,res) =>{
    const result = await Process.findById(req.params.id);
    if(result.process_title === "KAYIT") {
        res.status(200).json({error: "KAYIT işlem adımı silinemez.."})
    } else {
        const d = await Process.findByIdAndDelete(result._id)
        res.status(200).json(d);
    }
}

export { processes, create, find, update, _delete }