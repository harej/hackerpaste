/* jshint esversion: 8 */

import CryptoJS from 'crypto-js';

export const encryptData = (data, docKey) => CryptoJS.AES.encrypt(data, docKey);

export const decryptData = (data, docKey) =>
  CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data, docKey));

export const encryptObject = (data, seed) => {
  data = JSON.stringify(data);
  let encryptedData = encryptData(data, seed);
  data = {encrypted:encryptedData.toString()};
  return data;
};

export const decryptObject = (data, seed) =>
  decryptData(JSON.parse(data).encrypted, seed);
