import Cookies from "js-cookie";

export const setCookie = (
  name: string,
  value: any,
  options: Cookies.CookieAttributes = {}
) => {
  return Cookies.set(name, value, options);
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const getAllCookies = () => {
  return Cookies.get();
};

export const removeCookie = (name: string) => {
  return Cookies.remove(name);
};
