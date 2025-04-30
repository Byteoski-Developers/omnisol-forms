// @ts-ignore
import Cookies from "js-cookie";

const TokenKey = "Token"

export function getToken(): string | undefined {
  return Cookies.get(TokenKey);
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token);
}

export function clearAllCookie() {
  Cookies.remove(TokenKey);
  localStorage.removeItem("default_case_id");
}
