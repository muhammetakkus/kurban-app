import axios from "axios";

class MessageService {
    send(payload) {
        //return axios.get(`http://api.pusulasms.com/toplusms.asp?kullanici=test&parola=test&telefonlar=905385426714;05385426714;5385426714&mesaj=DenemeKurbanAp&gonderen=PUSULASMS`);
        return axios.post('/message/send', payload)
    }

    create(payload) {
        console.log(payload);
        return axios.post(`/message/${payload.kurum_id}`, payload);
    }

    getAll(payload) {
        return axios.get(`/message/all/${payload.kurum_id}`)
    }

    get(id) {
        return axios.get(`/message/${id}`);
    }

    update(data) {
        return axios.put(`/message/${data._id}`, data);
    }

    delete(id) {
        return axios.delete(`/message/${id}`);
    }
}

export default new MessageService();