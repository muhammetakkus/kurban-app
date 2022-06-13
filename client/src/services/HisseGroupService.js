import axios from "axios";

class HisseGroupService {
    create(payload) {
        console.log(payload);
        return axios.post(`/hisse-group`, payload);
    }

    getByProject(payload) {
        return axios.get(`/hisse-group/all/${payload.project_id}`)
    }

    get(id) {
        return axios.get(`/hisse-group/${id}`);
    }

    update(data) {
        return axios.put(`/hisse-group/${data._id}`, data);
    }

    delete(id) {
        return axios.delete(`/hisse-group/${id}`);
    }
}

export default new HisseGroupService();