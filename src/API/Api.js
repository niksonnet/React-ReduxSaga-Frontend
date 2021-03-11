const API_BASE_ADDRESS = "http://localhost:52632/api/user/authenticate";

export default class Api {
  static AuthenticateUser(userPayload) {
    const uri = API_BASE_ADDRESS;

    return fetch(uri, {
      method: 'POST',
      body: JSON.stringify(userPayload),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log('Successful' + data);
      })
    });
  }
}
