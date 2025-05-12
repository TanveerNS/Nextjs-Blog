// utils/encryption.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.ENCRYPTION_SECRET || "helloworlduisysijslifjlllse";

export const encryptText = (text) => {
  if (!SECRET_KEY) throw new Error('Missing ENCRYPTION_SECRET');
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptText = (cipherText) => {
  console.log(SECRET_KEY, 'key', cipherText);
  if (!SECRET_KEY) throw new Error('Missing ENCRYPTION_SECRET');
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
