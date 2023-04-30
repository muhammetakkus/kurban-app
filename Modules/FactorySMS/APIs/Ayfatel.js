import SMSInterface from "../SMSInterface.js"
import fetch from 'cross-fetch'

class Ayfatel extends SMSInterface {
    constructor(user_name, password, origin) {
        super(user_name, password, origin)
        this.user_name = user_name
        this.password = password
        this.origin = origin
    }

    async send(gsm, message) {
        console.log('will send with ayfatel')
    }
}

export default Ayfatel