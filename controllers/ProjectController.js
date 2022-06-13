import Project from '../models/Project.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose';
const projects = asyncHandler( async (req,res) => {
    if( !mongoose.Types.ObjectId.isValid(id) ) return false;
    const projects = await Project.find({kurum_id: req.params.kurum_id}).select("-template")
    return res.status(200).json(projects);
})

const find = async (req,res) => {
   try {
        // routerda /kurum/:kurum_id/project/:id şeklinde id parametresi var
        const project = await Project.findById({ 
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
    const filter = { name: 'Alex' };
    const update = { age: '19' };
    let doc = await Project.findOneAndUpdate(filter, update);
}

const create = async (req,res) => {
    const {kurum_id, project_name} = req.body
    const isProject = await Project.find( { $and: [ { kurum_id: kurum_id }, { project_name: project_name }  ] })
    //const isProject = await Project.find({ kurum_id: kurum_id, project_name: project_name }).exec();
    
    if(isProject !== null && isProject.length > 0) {
        res.status(200).json({error: "Bu isimde bir proje mevcut.."});
    } else {
        const project = await Project.create(req.body);
        res.status(200).json(project);
    }
}

const _delete = async (req,res) =>{
    const result = await Project.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
}


export { projects, create, find, update, _delete}