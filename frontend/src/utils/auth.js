class Auth {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  register(password, email) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._handleOriginalResponse);
  }

  authorize(password, email) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._handleOriginalResponse)
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      mode: 'cors',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleOriginalResponse);
  }
}

const auth = new Auth({
  baseUrl: "https://api.mesto.markov.nomoredomains.work",
  headers: {
    "Content-Type": "application/json",
  },
});

export { auth };
