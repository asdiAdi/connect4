const intToString = (i: number, letterCase: "u" | "l" = "l"): string => {
  if (i <= 0 || i > 26) {
    throw new Error("Invalid number");
  }
  return String.fromCharCode((letterCase === "l" ? 96 : 64) + i);
};

const alphanumeric =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

//generate random string 4
const randomString = (num = 4) => {
  let str = "";
  for (let i = 0; i < num; i++) {
    str += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
  }
  return str;
};

export { intToString, randomString };
