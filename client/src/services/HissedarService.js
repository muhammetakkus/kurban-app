import axios from "axios";

// KüçükBaşKurban
class KKurbanService {
    create(project_id, data) {
        return axios.post(`/kucuk-bas-kurban/${project_id}`, data);
    }

    getAll(payload) {
        return axios.get(`/kucuk-bas-kurbans/${payload.project_id}`)
    }

    get(id) {
        return axios.get(`/kucuk-bas-kurban/${id}`);
    }

    update(id, data) {
        return axios.put(`/kucuk-bas-kurban/${id}`, data);
    }

    delete(payload) {
        return axios.delete(`/kucuk-bas-kurban/${payload.id}`);
    }
}

export default new KKurbanService();