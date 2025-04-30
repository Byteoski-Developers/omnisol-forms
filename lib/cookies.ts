// Cookie utility functions

/**
 * Set a cookie with the given name and value
 * @param name Cookie name
 * @param value Cookie value
 * @param days Number of days until the cookie expires (optional)
 */
export function setCookie(name: string, value: string, days?: number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}

/**
 * Get a cookie value by name
 * @param name Cookie name
 * @returns Cookie value or empty string if not found
 */
export function getCookie(name: string): string {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return '';
}

/**
 * Delete a cookie by name
 * @param name Cookie name
 */
export function deleteCookie(name: string) {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
