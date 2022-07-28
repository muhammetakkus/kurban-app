import axios from "axios";

class KurumService {

    create(payload) {
    }

    update(data) {
        return axios.put(`/kurum/${data._id}`, data);
    }
}

export default new KurumService();