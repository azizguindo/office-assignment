import axios from 'axios';

const STATUT = 'statuts';
const API_URL = 'http://localhost:8080/api';
const STATUT_API_URL = `${API_URL}/${STATUT}`;

class StatusDataService {

    retrieveStatuts(){
        return axios.get(`${STATUT_API_URL}`);
    }

}

export default new StatusDataService();