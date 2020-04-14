import bcrypt from 'bcryptjs';

export const isDev = () => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return false;
};

export const baseURL = isDev()
  ? 'http://localhost:8080'
  : 'https://web-daw-backend.herokuapp.com';

export const encryptPass = async pass => {
  const hashedPass = await new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        // console.log(`Error salt: ${err}`);
        reject(err);
      }

      // eslint-disable-next-line consistent-return
      bcrypt.hash(pass, salt, (error, hash) => {
        if (error) {
          // console.log(`Error hash: ${error}`);
          reject(err);
        }
        resolve(hash);
      });
    });
  });

  return hashedPass;
};

export const comparePass = async (pass, hash) => {
  const passMatch = await new Promise((resolve, reject) => {
    bcrypt.compare(pass, hash, (err, res) => {
      if (err) {
        // console.log(`Error compare: ${err}`);
        reject(err);
      }

      resolve(res);
    });
  });

  return passMatch;
};
