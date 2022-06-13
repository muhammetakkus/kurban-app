import axios from "axios";

class ProjectService {
    create(payload) {
        console.log(payload);
        return axios.post(`/project/${payload.kurum_id}`, payload);
    }

    getAll(payload) {
        return []//axios.get(`/project/all/${payload.kurum_id}`)
    }

    get(id) {
        return axios.get(`/project/${id}`);
    }

    update(id, data) {
        return axios.put(`/project/${id}`, data);
    }

    delete(payload) {
        return axios.delete(`/project/${payload.id}`);
    }
}

export default new ProjectService();