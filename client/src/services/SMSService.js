import axios from "axios";

// kurumun oluşturduğu sms apiler
class MessageAPIService {
    create(payload) {
        console.log(payload);
        return axios.post(`/sms-service`, payload);
    }

    getAll(payload) {
        return axios.get(`/sms-service/all/${payload.kurum_id}`)
    }

    /*get(id) {
        return axios.get(`/message-api/${id}`);
    }*/

    update(data) {
        return axios.put(`/sms-service/${data._id}`, data);
    }

    delete(id) {
        return axios.delete(`/sms-service/${id}`);
    }    
}

export default new MessageAPIService();