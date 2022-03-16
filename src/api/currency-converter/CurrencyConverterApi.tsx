import Cookies from "universal-cookie";
import { CurrencyConverter } from "../../types/CurrencyConverter";

const baseApi = "https://coinpass-technical-test.herokuapp.com/api/currency";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const cookies = new Cookies();

export const CurrencyConvertApi = () => {
  const token = cookies.get("token");

  const convertCurrency = (currencyInputs: CurrencyConverter): Promise<any> => {
    return fetch(baseApi + "/convert", {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(currencyInputs),
    }).then((res) => {
      if (!res.ok) return Promise.reject();
      return res.json().then((res) => res);
    });
  };

  return {
    convertCurrency,
  };
};
