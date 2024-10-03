import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      dto: {},
      // isAuth: false,
    };
  }
  async fetchAuth({ login, password }) {
    // test_1 123456
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Указываем тип контента JSON
        },
        body: JSON.stringify({ login, password }),
      });
      if (!response.ok) {
        const json = await response.json();

        return json.error.message;
      }

      const json = await response.json();
      localStorage.setItem('X-Token', json.result.token);

      //Если токен изменился ,то нужно проверить на соответствие

      this.setState({
        ...this.getState(),
        dto: { ...json.result.user.profile, email: json.result.user.email },
      });
      if (response.ok) {
        return 'ok';
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchAuthByToken() {
    // test_1 123456
    const token = localStorage.getItem('X-Token');
    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      // console.log(json.result.profile, '---------------json');
      // console.log(this, '---------------this');

      this.setState({
        ...this.getState(),
        dto: { ...json.result.profile, email: json.result.email },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async fetchDelAuthToken() {
    // test_1 123456
    const token = localStorage.getItem('X-Token');
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const json = await response.json();
      localStorage.setItem('X-Token', json.result.token);

      this.setState({
        ...this.getState(),
        dto: json.result.user,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthState;
