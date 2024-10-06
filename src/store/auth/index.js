import { profile } from '../exports';
import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      // dto: {},
      isAuth: false,
      errorAuth: '',
    };
  }
  async fetchAuth({ login, password }) {
    // test_1 123456
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const json = await response.json();
        this.setState({
          ...this.getState(),
          errorAuth: json.error.data.issues[0].message,
        });
      }

      const json = await response.json();
      localStorage.setItem('X-Token', json.result.token);

      if (response.ok) {
        this.store.setState({
          ...this.store.getState(),
          profile: {
            ...this.store.getState().profile,
            dto: {
              ...json.result.user.profile,
              email: json.result.user.email,
            },
          },
          auth: {
            ...this.store.getState().auth,
            isAuth: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchAuthByToken() {
    // test_1 123456
    const token = localStorage.getItem('X-Token');
    if (token) {
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
        // console.log(json.result, '------------------------json');

        if (response.ok) {
          // console.log(this.store.getState(),"-------------this");

          this.store.setState({
            ...this.store.getState(),
            profile: {
              ...this.store.getState().profile,
              dto: {
                ...json.result.profile,
                email: json.result.email,
              },
            },
            auth: {
              ...this.store.getState().auth,
              isAuth: true,
            },
          });
        }
        // console.log(this.store, '------------------store');
      } catch (error) {
        console.log(error);
      }
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
          'X-Token': token,
        },
        // body: JSON.stringify({ token }),
      });
      const json = await response.json();
      // localStorage.setItem('X-Token', json.result.token);

      if (json.result) {
        this.store.setState({
          ...this.store.getState(),
          profile: {
            ...this.store.getState().profile,
            dto: {},
          },
          auth: {
            ...this.store.getState().auth,
            isAuth: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthState;
