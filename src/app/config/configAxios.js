import axios from 'axios';
import odb from '../helpers/odb';

const clientAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${odb.get('authToken')}`
      }
});

export default clientAxios;