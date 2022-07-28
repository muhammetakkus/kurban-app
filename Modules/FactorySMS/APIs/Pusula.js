import SMSInterface from "../SMSInterface.js"
import fetch from 'cross-fetch'

class Pusula extends SMSInterface {
    constructor(user_name, password, origin) {
        super(user_name, password, origin)
        this.user_name = user_name
        this.password = password
        this.origin = origin
    }

    async send(gsm, message) {
        await fetch(`http://api.pusulasms.com/toplusms.asp?kullanici=${this.user_name}&parola=${this.password}&telefonlar=${gsm}&mesaj=${message}&gonderen=${this.origin}`)
        .then(res => {
            console.log(res)
            if (res.status >= 400) { throw new Error("Bad response from server - Pusula.js"); }
            return {status: res.status}
        })
        .then(data => {
            if(data.status === 200) { return true; }
        })
        .catch(err => { console.error(err); return err; });
    }
}

export default Pusula