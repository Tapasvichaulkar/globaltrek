import CryptoJS from "crypto-js";

/* ================= SECRET KEY ================= */
const SECRET_KEY = "mySuperSecretKey123";

/* ================= CAESAR ================= */
export const caesarEncrypt = (text, shift = 3) => {
  return text
    .split("")
    .map((char) =>
      String.fromCharCode(char.charCodeAt(0) + shift)
    )
    .join("");
};

export const caesarDecrypt = (text, shift = 3) => {
  return text
    .split("")
    .map((char) =>
      String.fromCharCode(char.charCodeAt(0) - shift)
    )
    .join("");
};

/* ================= AES ================= */
export const aesEncrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const aesDecrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

/* ================= RAIL FENCE ================= */
export const railFenceEncrypt = (text, rails = 3) => {
  if (rails <= 1) return text;

  let fence = Array.from({ length: rails }, () => []);
  let rail = 0;
  let direction = 1;

  for (let char of text) {
    fence[rail].push(char);
    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  return fence.flat().join("");
};

/* ================= MD5 ================= */
export const md5Encrypt = (text) => {
  return CryptoJS.MD5(text).toString();
};