import Buyukbas from '../models/Buyukbas.js'
import MessageTemplate from '../models/MessageTemplate.js'
import asyncHandler from 'express-async-handler'
import fetch from 'cross-fetch'

const find = asyncHandler( async (req,res) => {
    const buyukbas = await Buyukbas.find({_id: req.params.id})
    return res.status(200).json(buyukbas);
})

const findAll = asyncHandler( async (req,res) => {
    const buyukbas = await Buyukbas.find({project_id: req.params.project_id}).populate("hisse").sort('-createdAt')
    return res.status(200).json(buyukbas);
})


const update = async (req,res) => {
    // net hisse fiyat number gelmeli yoksa hata veriyor
    const id = { _id: req.params.id }
    const { kurban_id, message_template, process_title } = req.body.kurban_process

    /* Process/İşlem adımına bağlı mesaj gönderme */
    let is_message_send = 0
    if(message_template) {

        const buyukbas = await Buyukbas.find({_id: kurban_id}).populate("hisse")
        const message = await MessageTemplate.find({message_template: message_template})   

        if(buyukbas[0].hisse.length > 0) {

            const hissedar_adet = buyukbas[0].hisse.length
            let gonderilen_mesaj = 0
            let GSMs = ""
            let message_txt = ""
            buyukbas[0].hisse.forEach(hissedar => {
                GSMs+=hissedar.hissedar_gsm
                gonderilen_mesaj++
                gonderilen_mesaj < hissedar_adet ? GSMs+=";" : null
            });
    
            message_txt = message[0].message_content


            console.log(buyukbas[0].hisse)

            await fetch(`http://api.pusulasms.com/toplusms.asp?kullanici=YENIBOSNA&parola=655330&telefonlar=${GSMs}&mesaj=${message_txt}&gonderen=Y.BosnaYurt`)
            .then(res => {
                if (res.status >= 400) { throw new Error("Bad response from server - BuyukbasKurbanController.js"); }
                return {status: res.status}
            })
            .then(data => {
                if(data.status === 200) { is_message_send = 1 }
            })
            .catch(err => { console.error(err); });
        }
    }
    
    let doc = await Buyukbas.findOneAndUpdate(id, {kurban_process: process_title});
    return res.status(200).json({...doc._doc, is_message_send: is_message_send});
}

const create = async (req,res) => {
    const {kurum_id, project_id} = req.body
    const countKurban = await Buyukbas.countDocuments( { kurum_id: kurum_id }, { project_id: project_id }  )
    const createKurban = await Buyukbas.create({ ...req.body, kurban_no: countKurban+1 })
    return res.status(200).json(createKurban);
}

const _delete = async (req,res) =>{
    const result = await Buyukbas.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
}


export { create, find, findAll, update, _delete}