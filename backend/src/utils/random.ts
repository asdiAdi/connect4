//generate random string 4

const alphanumeric =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

const randomString = (num = 4) => {
  let str = "";
  for (let i = 0; i < num; i++) {
    str += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
  }
  return str;
};

export { randomString };
