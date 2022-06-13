import Process from '../models/Process.js'
import asyncHandler from 'express-async-handler'

const processes = asyncHandler( async (req,res) => {
    const projects = await Process.find({kurum_id: req.params.kurum_id}).sort('-createdAt')
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

    

    let doc = await Process.findOneAndUpdate(id, req.body);
    
    res.status(200).json(doc);    
}

const create = async (req,res) => {
    const {kurum_id, process_title} = req.body
    const isProcess = await Process.find( { $and: [ { kurum_id: kurum_id }, { process_title: process_title }  ] })
    //const isProject = await Process.find({ kurum_id: kurum_id, project_name: project_name }).exec();
    
    if(isProcess !== null && isProcess.length > 0) {
        res.status(200).json({error: "Bu isimde bir işlem adımı mevcut.."});
    } else {
        const process = await Process.create(req.body);
        res.status(200).json(process);
    }
}

const _delete = async (req,res) =>{
    const result = await Process.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
}


export { processes, create, find, update, _delete }