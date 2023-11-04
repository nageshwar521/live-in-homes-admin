import { Cookies as ReactCookies } from "react-cookie";

const warning = () => {
  return false;
};

class Cookies {
  _cookies: any = {};
  constructor() {
    if (typeof window !== "undefined") this._cookies = new ReactCookies();
    else
      this._cookies = {
        get: warning,
        set: warning,
        remove: warning,
      };
  }
  setCookie(opts: any) {
    this._cookies = new ReactCookies(Object.assign({}, opts));
  }
  removeCookie(opts: any) {
    return this._cookies.remove(opts);
  }
  get cookies() {
    return this._cookies;
  }
  getCookie(name: any) {
    return this._cookies[name];
  }
}

export const cookies = new Cookies();
export const getUniversalCookies = () => cookies.cookies;
