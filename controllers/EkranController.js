import Ekran from '../models/Ekran.js'
import asyncHandler from 'express-async-handler'

const ekrans = asyncHandler( async (req,res) => {
    const projects = await Ekran.find({kurum_id: req.params.kurum_id}).populate("process").sort('-createdAt')
    return res.status(200).json(projects);
})

const find = async (req,res) => {
   try {
        // routerda /kurum/:kurum_id/project/:id şeklinde id parametresi var
        const project = await Ekran.findById({ 
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
    const isEkran = await Ekran.find( { $and: [ { screen_title: req.body.screen_title }  ] })
    
    if(isEkran !== null && isEkran.length > 0 && isEkran[0]._id != req.params.id) {
        res.status(200).json({error: "Bu başlıkta bir Ekran mevcut.."});
    } else {
        let doc = await Ekran.findOneAndUpdate(id, req.body);
        res.status(200).json(doc);
    }
    
}

const create = async (req,res) => {
    const {kurum_id, screen_title } = req.body
    const isEkran = await Ekran.find( { $and: [ { kurum_id: kurum_id }, { screen_title: screen_title }  ] })
    //const isProject = await Ekran.find({ kurum_id: kurum_id, project_name: project_name }).exec();
    
    if(isEkran !== null && isEkran.length > 0) {
        res.status(200).json({error: "Bu başlıkta bir Ekran mevcut.."});
    } else {
        const ekran = await Ekran.create(req.body);
        res.status(200).json(ekran);
    }
}

const _delete = async (req,res) =>{
    const result = await Ekran.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
}



export { ekrans, create, find, update, _delete }