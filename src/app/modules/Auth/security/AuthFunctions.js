import axios from "axios";

export const API_URL = `${process.env.REACT_APP_API_URL}`;
export const LOGIN_URL = `${process.env.REACT_APP_API_URL}`;
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = `${process.env.REACT_APP_API_URL}/auth/me`;

export function login(user, pass) {
  // return axios.post(LOGIN_URL, { email, password });

  const userTemporal = 'v103802128';
  const passTemporal = '!Q2w3e4r5';
  const mtcaptcha = document.querySelector('[name="mtcaptcha-verifiedtoken"]').value;

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      Authorization: `Basic ${btoa(`${userTemporal}:${passTemporal}:${mtcaptcha}`)}`
    }
  };

  return axios.get(`${API_URL}users/authentication/`, axiosConfig).then((res) => {

    return res;
  }).catch((err) => {
    console.log("errorEnConsulta", err);
    let txt = '';
    switch (err.response.status) {
      case 423:
        txt = 'Actualización de contraseña requerida';
        break;
      case 401:
        txt = 'Credenciales inválidas';
        break;
      case 424:
        txt = 'Desafío captcha usado. Por favor resuélvalo nuevamente';
        setTimeout(() => {
          window.location.href = '/signin';
        }, 3000);
        break;
      default:
        txt = 'Error al registrar usuario';
    }

    alert("txt:" + txt);
    return err.json();
  });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
