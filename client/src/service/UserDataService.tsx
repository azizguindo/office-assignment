import axios from 'axios';

const INSTRUCTOR = 'users';
const API_URL = 'http://localhost:8080/api';
const INSTRUCTOR_API_URL = `${API_URL}/${INSTRUCTOR}`;

class UserDataService {

    retrieveAllUsers(){
        return axios.get(`${INSTRUCTOR_API_URL}`);
    }

    deleteUser(id){
        return axios.delete(`${INSTRUCTOR_API_URL}/${id}`);
    }

    retrieveUser(id){
        return axios.get(`${INSTRUCTOR_API_URL}/${id}`);
    }

    updateUser(id,user){
        return axios.put(`${INSTRUCTOR_API_URL}/${id}`,user);
    }

    createUser(user){
        return axios.post(`${INSTRUCTOR_API_URL}/`,user);
    }

}

export default new UserDataService();