import axios from 'axios';

const INSTRUCTOR = 'offices';
const API_URL = 'http://localhost:8080/api';
const INSTRUCTOR_API_URL = `${API_URL}/${INSTRUCTOR}`;

class OfficeDataService {

    retrieveAllOffices(){
        return axios.get(`${INSTRUCTOR_API_URL}`);
    }

    deleteOffice(id){
        return axios.delete(`${INSTRUCTOR_API_URL}/${id}`);
    }

    retrieveOffice(id){
        return axios.get(`${INSTRUCTOR_API_URL}/${id}`);
    }

    updateOffice(id,office){
        return axios.put(`${INSTRUCTOR_API_URL}/${id}`,office);
    }

    createOffice(office){
        return axios.post(`${INSTRUCTOR_API_URL}/`,office);
    }

}

export default new OfficeDataService();