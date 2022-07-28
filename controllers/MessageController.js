import MessageTemplate from '../models/MessageTemplate.js'
import asyncHandler from 'express-async-handler'
import SMSFactory from '../Modules/FactorySMS/SMSFactory.js'
import Kurum from '../models/Kurum.js'

const messages = asyncHandler( async (req,res) => {
    const projects = await MessageTemplate.find({kurum_id: req.params.kurum_id}).sort('-createdAt')
    return res.status(200).json(projects);
})

const find = async (req,res) => {
   try {
        // routerda /kurum/:kurum_id/project/:id şeklinde id parametresi var
        const project = await MessageTemplate.findById({ 
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
    const isMessageTemplate = await MessageTemplate.find( { $and: [ { message_title: req.body.message_title }  ] })
    
    if(isMessageTemplate !== null && isMessageTemplate.length > 0 && isMessageTemplate[0]._id != req.params.id) {
        res.status(200).json({error: "Bu başlıkta bir mesaj şablonu mevcut.."});
    } else {
        let doc = await MessageTemplate.findOneAndUpdate(id, req.body);
        res.status(200).json(doc);
    }
    
}

const create = async (req,res) => {
    const {kurum_id, message_title } = req.body
    const isMessageTemplate = await MessageTemplate.find( { $and: [ { kurum_id: kurum_id }, { message_title: message_title }  ] })
    //const isProject = await MessageTemplate.find({ kurum_id: kurum_id, project_name: project_name }).exec();
    
    if(isMessageTemplate !== null && isMessageTemplate.length > 0) {
        res.status(200).json({error: "Bu başlıkta bir mesaj şablonu mevcut.."});
    } else {
        const process = await MessageTemplate.create(req.body);
        res.status(200).json(process);
    }
}

const _delete = async (req,res) =>{
    const result = await MessageTemplate.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
}


const send = async (req,res) => {
    const { hissedarlar, message, kurum_id, kurban_code = "", kurban_no = "", kurban_info_message = 0 } = req.body
    let message_txt = message?.message_content

    const kurumMessageAPI = await Kurum.findById( kurum_id ).populate("active_sms_api");

    let GSMs = []
    hissedarlar.forEach(hissedar => {
        GSMs.push(hissedar.hissedar_gsm)
    });

    if(kurban_info_message) {
        message_txt= `Muhterem hissedarımız, ${kurban_no} NO'lu kurbanınız ile alakalı durum takibi ve bilgilere ${process.env.NODE_ENV === "production" ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_LOCAL}/kurban-info/${kurban_code} adresinden ulaşabilirsiniz.`
    }

    // with Factory Design Pattern
    const smsAPI =  new SMSFactory(
        kurumMessageAPI.active_sms_api?.message_api_title,
        kurumMessageAPI.active_sms_api?.message_service_username,
        kurumMessageAPI.active_sms_api?.message_service_password,
        kurumMessageAPI.active_sms_api?.message_service_origin
    )

    for (let index = 0; index < GSMs.length; index++) {
        smsAPI.send(GSMs[index], message_txt)
    }

    res.status(200).json(true);
}

export { messages, create, find, update, _delete, send }