import axios from "axios";

class ProjectService {
    getAll(payload) {
        return axios.get(`/kurum/${payload.kurum_id}/project`)
    }

    get(id) {
        return axios.get(`/kurum/project/${id}`);
    }

    update(id, data) {
    return axios.put(`/kurum/project/${id}`, data);
    }

    delete(id) {
    return axios.delete(`/kurum/project/${id}`);
    }
}

export default new ProjectService();