import axios from "axios";

class EkranService {
    create(payload) {
        return axios.post(`/ekran`, payload);
    }

    getAll(payload) {
        return axios.get(`/ekran/all/${payload.kurum_id}`)
    }

    get(id) {
        return axios.get(`/ekran/${id}`);
    }

    update(id, data) {
        return axios.put(`/ekran/${id}`, data);
    }

    delete(id) {
        return axios.delete(`/ekran/${id}`);
    }
}

export default new EkranService();