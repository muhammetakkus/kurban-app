import Buyukbas from "../../models/Buyukbas.js";
import Kurum from "../../models/Kurum.js";
import MessageTemplate from "../../models/MessageTemplate.js";
import Process from "../../models/Process.js";
import SMSFactory from "../../Modules/FactorySMS/SMSFactory.js";
// import MessageAPI from "../../Modules/MessageAPI.js";

/**
 * kurbanın process'ini değiştirir
 * varsa process sms'ini gönderir
 */
class KurbanProcessChangeFacade {
    messageTemplateID;
    kurumMessageAPI = null;
    GSMs = []

    constructor (kurbanID, processID, kurumID){
        this.kurbanID = kurbanID
        this.processID = processID
        this.kurumID = kurumID
    }

    async changeKurbanProcess() {
        const doc = await Buyukbas.findOneAndUpdate(this.kurbanID, {process: this.processID}, {new: true}).populate('hisse');
        
        if(doc.hisse.length > 0 && await this.isProcessHasMessageTemplate()){
            await this.setGSM(doc.hisse)
            this.sendSMS()
        }

        return doc
    }

    /**
     * @returns {boolean}
     */
     async isProcessHasMessageTemplate() {
        const process = await Process.findById(this.processID)
        if(process.message_template) {
            this.messageTemplateID = process.message_template
            return true
        } else {
            return false
        }
    }

    async getMessageTemplate() {
        const message = await MessageTemplate.findById(this.messageTemplateID)
        return message
    }

    setGSM(data) {
        data.forEach(hissedar => {
            this.GSMs.push(hissedar.hissedar_gsm)
        });
        return this.GSMs
    }

    async getActiveSMSAPI() {
        const kurum = await Kurum.findById(this.kurumID).populate('active_sms_api')
        this.kurumMessageAPI = kurum.active_sms_api
        return this.kurumMessageAPI
    }

    async sendSMS() {
        await this.getActiveSMSAPI()
        const message = await this.getMessageTemplate()
        console.log(this.GSMs)
        console.log(this.kurumMessageAPI)
        
        // with Factory Design Pattern
        const smsAPI =  new SMSFactory(
                this.kurumMessageAPI.message_api_title,
                this.kurumMessageAPI.message_service_username,
                this.kurumMessageAPI.message_service_password,
                this.kurumMessageAPI.message_service_origin
            )

        for (let index = 0; index < this.GSMs.length; index++) {
            smsAPI.send(this.GSMs[index], message.message_content)
        }
    }
}

export default KurbanProcessChangeFacade