export const isDev = () => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return false;
};

export const baseURL = isDev()
  ? 'http://localhost:8080'
  : 'https://web-daw-backend.herokuapp.com';
