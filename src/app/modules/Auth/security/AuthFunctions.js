import axios from "axios";

export const API_URL = `${process.env.REACT_APP_API_URL}`;
export const LOGIN_URL = `${process.env.REACT_APP_API_URL}`;
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = `${process.env.REACT_APP_API_URL}/auth/me`;

export function login(user, pass) {

  const mtcaptcha = document.querySelector('[name="mtcaptcha-verifiedtoken"]').value;

  const axiosConfig = {
    headers: {
      Accept: 'application/vnd.api+json',
      Authorization: `Basic ${btoa(`${user}:${pass}:${mtcaptcha}`)}`
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

    const jsonRespuesta = {
      "status": 400,
      "txt": txt
    }

    return jsonRespuesta;
  });
}

export function register(user, email, password) {

  const data = {
    jsonapi: { version: '1.0' },
    data: {
      type: 'newUser',
      id: user,
      attributes: {
        uid: user,
        mail: email,
        pass: password
      }
    }
  };
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json'
    }
  };

  axios.post(`${API_URL}users/`, data, axiosConfig).then(function (res) {

    console.log("registerRes", res);
  }).catch((err) => {
    let txt = '';
    switch (err.response.status) {
      case 409:
        txt = 'El usuario ya se encuentra registrado';
        break;
      default:
        txt = 'Error al registrar usuario';
    }

    const jsonRespuesta = {
      "status": 400,
      "txt": txt
    }

    return jsonRespuesta;
  });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, {email});
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
