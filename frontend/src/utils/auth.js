export const BASE_URL = 'https://api.borove4ik.nomoredomainsmonster.ru/';
// export const BASE_URL = 'http://localhost:3000';


export const validateResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(
        `Упс, сервер ответил ошибкой: ${res.status}, ${res.message}`
      );
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(validateResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(validateResponse);
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    })
    .then(validateResponse);
}
