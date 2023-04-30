import axios from "axios";

class KurumService {

    create(payload) {
    }

    update(data) {
        return axios.put(`/kurum/${data._id}`, data);
    }

    get(id) {
        return axios.get(`/kurum/${id}`);
    }

    onKayitMail(data) {
        console.log(data);
        return axios.post(`/kurum/onkayit/${data.kurum_id}`, data);
    }
}

export default new KurumService();