import Hissedar from '../models/Hissedar.js'
import asyncHandler from 'express-async-handler'

const getHissedar = asyncHandler( async (req,res) => {
    const hisse = await Hissedar.findById({_id: req.params.id})
    return res.status(200).json(hisse);
})


const getHissedars = async (req,res) => {
   try {
        // routerda /kurum/:kurum_id/project/:id şeklinde id parametresi var
        const hissedars = await Hissedar.find({
            kurum_id: req.params.kurum_id
        });
        res.status(200).json(hissedars);
   } catch (error) {
        console.log(error);
        res.status(500).send(error);
   }
}

const update = async (req,res) => {
    const id = { _id: req.params.id }
    let doc = await Hissedar.findOneAndUpdate(id, req.body);
}

const create = async (req,res) => {
    const hisse = await Hissedar.create(req.body)
    res.status(200).json(hisse);
}

const _delete = async (req,res) =>{
    const result = await Hissedar.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json(result);
}


export { getHissedar, getHissedars, create, update, _delete}