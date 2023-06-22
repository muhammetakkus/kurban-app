import Hisse from '../models/Hisse.js'
import Buyukbas from '../models/Buyukbas.js'
import asyncHandler from 'express-async-handler'
import Hissedar from '../models/Hissedar.js'

const findByKurbanID = asyncHandler( async (req,res) => {
    const hisse = await Hisse.find({project_id: req.params.project_id}).sort('-createdAt')
    return res.status(200).json(hisse);
})

const findByProjectID = asyncHandler( async (req,res) => {
    const hisse = await Hisse.find({project_id: req.params.project_id}).sort('-createdAt')
    return res.status(200).json(hisse);
})

const find = async (req,res) => {
   try {
        // routerda /kurum/:kurum_id/project/:id şeklinde id parametresi var
        const project = await Hisse.findById({ 
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
    let doc = await Hisse.findOneAndUpdate(id, req.body);
}

const create = async (req,res) => {
    const hasHissedar = await Hisse.find({hissedar_gsm: req.body.hissedar_gsm, kurum_id: req.body.kurum_id})

    const hisse = await Hisse.create(req.body).then(async (document) => {

        // Eğer bu kurumun hisse kayıtlarında böyle bir hissedar yoksa hissedar tablosuna ekle 
        if(!hasHissedar || hasHissedar?.length === 0) await Hissedar.create(req.body)

        return Buyukbas.findByIdAndUpdate(
            req.body.kurban_id,
            { $push: { hisse: document._id } },
            { new: true, useFindAndModify: false }
          );
    })
    res.status(200).json(hisse);
}

const _delete = async (req,res) =>{
    const result = await Hisse.findByIdAndDelete({ _id: req.params.id }).then(document => {
        return Buyukbas.findByIdAndUpdate(
            req.body.kurban_id,
            { $pull: { hisse: document._id } },
          );
    })
    res.status(200).json(result);
}


export { findByProjectID, findByKurbanID, create, find, update, _delete}