const test =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).+$/;

const s = "qsc@1zqq";

console.log(test.test(s));
