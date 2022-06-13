import axios from "axios";

class ProcessService {
    create(payload) {
        console.log(payload);
        return axios.post(`/process/${payload.kurum_id}`, payload);
    }

    getAll(payload) {
        return axios.get(`/process/all/${payload.kurum_id}`)
    }

    get(id) {
        return axios.get(`/process/${id}`);
    }

    update(data) {
        return axios.put(`/process/${data._id}`, data);
    }

    delete(id) {
        return axios.delete(`/process/${id}`);
    }
}

export default new ProcessService();