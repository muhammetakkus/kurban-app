import axios from "axios";

// BüyükBaşKurban
class BKurbanService {
    create(data) {
        return axios.post(`/buyukbas-kurban/${data.project_id}`, data);
    }

    // parametre payload şeklinde tek obj ise -> getAll({kurum_id: kurum._id, project_id: project_id}) şeklinde tek obj içinde gönderilmeli
    getAll(payload) {
        return axios.get(`/buyukbas-kurban/${payload.project_id}`)
    }

    // parametre bu şekilde ise get(direk_id)
    get(id) {
        return axios.get(`/buyukbas-kurban/${id}`);
    }
    
    /* */
    getKurbanInfo(kurban_code) {
        return axios.get(`/user/kurban-info/${kurban_code}`);
    }

    update(payload) {
        return axios.put(`/buyukbas-kurban/${payload._id}`, payload);
    }

    delete(id) {
        return axios.delete(`/buyukbas-kurban/${id}`);
    }
}

export default new BKurbanService();