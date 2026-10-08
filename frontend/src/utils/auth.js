export function handleAuthError(error, tokenKey) {
  if (error.response?.status === 401) {
    localStorage.removeItem(tokenKey);
    return true;
  }

  return false;
}