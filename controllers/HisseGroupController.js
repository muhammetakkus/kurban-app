import HisseGroup from '../models/HisseGroup.js'
import asyncHandler from 'express-async-handler'

const hisse_groups = asyncHandler( async (req,res) => {
    const hissegroups = await HisseGroup.find({project_id: req.params.project_id}).sort('-createdAt')
    return res.status(200).json(hissegroups);
})

const findHisseGroup = async (req,res) => {
   try {
        // routerda /kurum/:kurum_id/project/:id şeklinde id parametresi var
        const project = await HisseGroup.findById({ 
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

    const has = await HisseGroup.find( { $and: [ { project_id: req.body.project_id }, { hisse_group_title: req.body.hisse_group_title }  ] })

    if(has !== null && has.length > 0) {
        res.status(200).json({error: "Bu isimde bir hisse grubu mevcut.."});
    } else {
        let doc = await HisseGroup.findOneAndUpdate(id, req.body);
        res.status(200).json(doc);
    }
}

const create = async (req,res) => {
    const {hisse_group_title, project_id} = req.body
    const isHisseGroup = await HisseGroup.find( { $and: [ { project_id: project_id}, { hisse_group_title: hisse_group_title }  ] })
    
    if(isHisseGroup !== null && isHisseGroup.length > 0) {
        res.status(200).json({error: "Bu isimde bir Hisse Grubu mevcut.."});
    } else {
        const hissegroup = await HisseGroup.create(req.body);
        res.status(200).json(hissegroup);
    }
}

const _delete = async (req,res) =>{
    const result = await HisseGroup.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
}


export { hisse_groups, create, findHisseGroup, update, _delete}