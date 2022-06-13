import axios from "axios";

class HisseService {
    create(payload) {
        console.log(payload);
        return axios.post(`/hisse`, payload);
    }

    getAll(payload) {
        return axios.get(`/hisse/all/${payload.kurum_id}`)
    }

    get(id) {
        return axios.get(`/hisse/${id}`);
    }

    update(id, data) {
        return axios.put(`/hisse/${id}`, data);
    }

    delete(id) {
        return axios.delete(`/hisse/${id}`);
    }
}

export default new HisseService();