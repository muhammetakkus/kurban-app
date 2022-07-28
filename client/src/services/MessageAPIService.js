import axios from "axios";

//  admin create eder
class MessageAPIService {
    create(payload) {
        console.log(payload);
        return axios.post(`/message-api`, payload);
    }

    getAll(payload) {
        return axios.get(`/message-api/all`)
    }

    /*get(id) {
        return axios.get(`/message-api/${id}`);
    }*/

    update(data) {
        return axios.put(`/message-api/${data._id}`, data);
    }

    delete(id) {
        return axios.delete(`/message-api/${id}`);
    }    
}

export default new MessageAPIService();