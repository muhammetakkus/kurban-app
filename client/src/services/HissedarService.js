import axios from "axios";

// Hissedar
class HissedarService {
    create(project_id, data) {
        return axios.post(`/hissedar`, data);
    }

    getAll(payload) {
        return axios.get(`/user/hissedar/${payload.kurum_id}`)
    }

    get(id) {
        return axios.get(`/hissedar/single/${id}`);
    }

    update(id, data) {
        return axios.put(`/hissedar/${id}`, data);
    }

    delete(payload) {
        return axios.delete(`/user/hissedar/${payload.id}`);
    }
}

export default new HissedarService();