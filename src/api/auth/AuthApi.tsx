const baseApi = "https://coinpass-technical-test.herokuapp.com/api/auth";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const AuthApi = () => {
  const login = (loginInputs: any): Promise<any> => {
    return fetch(baseApi + "/login", {
      method: "POST",
      headers,
      body: JSON.stringify(loginInputs),
    }).then((res) => {

      if (!res.ok) return Promise.reject();
      return res.json().then((res) => res);
    });
  };

  const getUserInfo = (token: string) => {
    return fetch(baseApi + "/userinfo", {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) return Promise.reject();
      return res.json().then((res) => res);
    });
  };

  return { login, getUserInfo };
};
