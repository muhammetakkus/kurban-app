import Buyukbas from '../models/Buyukbas.js'
import MessageTemplate from '../models/MessageTemplate.js'
import asyncHandler from 'express-async-handler'
import fetch from 'cross-fetch'
import Process from '../models/Process.js';
import AWS from 'aws-sdk'
//import fs from 'fs'

const findSingleBuyukbas = asyncHandler( async (req,res) => {
    const buyukbas = await Buyukbas.find({_id: req.params.id})
    return res.status(200).json(buyukbas);
})

const findForEkran = asyncHandler( async (req,res) => {
    // req.params.kurum_id
    // req.params.project_id
    // req.params.project_id
    // req.params.self

    if(req.params.self === "true") {
        const buyukbas = await Buyukbas.find({$and: [{process_id: req.params.process_id}, {project_id: req.params.project_id}]}).populate("hisse").populate("process").sort('createdAt').limit(1)
        console.log("self true runned")
        return res.status(200).json(buyukbas);
    } else {
        const process = await Process.findById(req.params.process_id)
        const processMain = await Process.find({ $and: [ { process_order: (process.process_order-1) }, { kurum_id: req.params.kurum_id } ] })
        if(processMain.length === 0) return res.status(200).json({error: "İLGİLİ PROCESS BULUNAMADI - BuyukbasKurbanController"});
        const buyukbas = await Buyukbas.find({$and: [{process: processMain[0]._id}, {project_id: req.params.project_id}]}).populate("hisse").populate("process").sort('createdAt').limit(1)
        return res.status(200).json(buyukbas);
    }
})

const findAll = asyncHandler( async (req,res) => {
    const buyukbas = await Buyukbas.find({project_id: req.params.project_id}).populate("hisse").populate("process").sort('createdAt')
    return res.status(200).json(buyukbas);
})

// bu method aslında 3-4 farklı metoda bölünmeliydi :(
const update = async (req,res) => {
    // net hisse fiyat number gelmeli yoksa hata veriyor
    const id = { _id: req.params.id }
    const { _id, message_template, process, kurban_kupe_no, net_hisse_fiyat, kurban_weight, kurban_note, kurban_hisse_group } = req.body

    /* Process/İşlem adımına bağlı mesaj gönderme */

    let is_message_send = 0
    if(req.body.process) {
        const is_message_template = await Process.findById(req.body.process)

        if(is_message_template.message_template) {
    
        const buyukbas = await Buyukbas.find({_id: _id}).populate("hisse")
        const message = await MessageTemplate.find({message_template: is_message_template.message_template})   

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
    }
    
    // change process or message template
    if(process || message_template) {
        let doc = await Buyukbas.findOneAndUpdate(id, {process: process}, {new: true});

        // burası sadece process change de tetiklenmeli aslında
        var io = req.app.get('socketio');
        // değişiklik yapılan process id sinde bir socket oluştur
        // console.log(doc.process)
        io.emit(doc.process)

        return res.status(200).json({...doc._doc, is_message_send: is_message_send});
    }
    
    // kurban edit
    if(kurban_kupe_no || net_hisse_fiyat || kurban_weight || kurban_note || kurban_hisse_group) {
        console.log("mesaj ve process update yok")
        console.log(req.body)
        const doc = await Buyukbas.findOneAndUpdate(id, req.body, {new: true});
        return res.status(200).json(doc);
    }
   
}

const create = async (req,res) => {
    const {kurum_id, project_id} = req.body
    const buyukbas = await Buyukbas.find({ project_id: project_id })
    const max_kurban_no = buyukbas.length > 0 ? buyukbas.reduce( (a,b) => a.kurban_no> b.kurban_no ? a : b).kurban_no : 0
    const countKurban = await Buyukbas.countDocuments( { kurum_id: kurum_id }, { project_id: project_id }  )
    let process = await Process.find({ $and: [{ kurum_id: kurum_id }, {process_order: 0}] });
    // process find ile çekildipğinde array içinde dönüyor create yapınca tek obj olarak dönüyor
    if(process.length === 0) {
        process = await Process.create({ kurum_id: kurum_id , process_title: "KAYIT", process_order: 0 })
    } else {
        process = process[0]
    }
    const createKurban = await Buyukbas.create({ ...req.body, process: process._id, kurban_no: max_kurban_no+1 })
    return res.status(200).json(createKurban);
}

const uploadKurbanVideo = async (req, res, next) => {
    const id = { _id: req.params.id }

    try{
        // delete if it has a video
        /*const f = await Buyukbas.findById(id)
        if(f.video_path) {
            const path = 'client/src/assets/uploads/' + f.video_path
            fs.unlink(path, (err) => {
                if (err) { console.error(err) }
            })
        }*/

        // delete s3 object
        const f = await Buyukbas.findById(id)
        if(f.video_path) {
            const s3 = new AWS.S3(
                { 
                    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
                    Bucket: "awskurbanapp"
                }
            );
              
            s3.deleteObject({
                Bucket: "awskurbanapp",
                Key: f.video_key
            }, function (err,data){
                console.log(data)
                console.log(err)
            })
        }


        // save new video path
        const uploaded = await Buyukbas.findOneAndUpdate(id, {
            //video_path: 'uploads/' + req.file.filename
            video_path: req.file.location,
            video_key: req.file.key
        }, {new: true});

        //console.log(req.file)

        return res.status(200).json(uploaded);
    }catch(error) {
        return res.status(200).json({error: error});
    }

}

const uploadKurbanImage = async (req, res, next) => {
    const id = { _id: req.params.id }

    try{
        // delete s3 object
        const kurban = await Buyukbas.findById(id)
        if(kurban.kurban_image) {
            const s3 = new AWS.S3(
                { 
                    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
                    Bucket: "awskurbanapp"
                }
            );
              
            s3.deleteObject({
                Bucket: "awskurbanapp",
                Key: kurban.kurban_image_key
            }, function (err,data){
                console.log(data)
                console.log(err)
            })
        }

        const uploaded = await Buyukbas.findOneAndUpdate(id, {
            kurban_image: req.file.location,
            kurban_image_key: req.file.key
        }, {new: true});

        return res.status(200).json(uploaded);
    }catch(error) {
        return res.status(200).json({error: error});
    }

}


const _delete = async (req,res) =>{
    const result = await Buyukbas.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
}


export { create, findSingleBuyukbas, findAll, findForEkran, update, _delete, uploadKurbanVideo, uploadKurbanImage }