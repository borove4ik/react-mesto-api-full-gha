class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
    this.getInfoResponse = null;
    this.getCardsResponse = null;
  }

  onResponse(res) {
    return res.ok ? res.json() : console.log(res);
  }

  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {
        return this.onResponse(res);
      })
      .then((res) => {
        this.getInfoResponse = res;
        return res;
      });
  }

  editUserInfo(formValues) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: formValues.name,
        about: formValues.about,
      }),
    }).then(this.onResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this.onResponse)
      .then((res) => {
        this.getCardsResponse = res;
        return res;
      });
  }

  setInfo({ inputName, inputInfo }) {
    console.log({ inputName, inputInfo });
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: inputName,
        about: inputInfo,
      }),
    }).then(this.onResponse);
  }

  setCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this.onResponse(res);
    });
  }

  deleteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this.onResponse);
  }

  changeLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this.onResponse(res);
    });
  }

  updateAvatar({ link }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this.onResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.borove4ik.nomoredomainsmonster.ru',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;
