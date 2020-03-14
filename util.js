const parse_str = str => {
  const pair = str.split("&");
  const result = {};
  for (let i = 0; i < pair.length; i++) {
    const key_value = pair[i];
    const x = key_value.split("=");
    if (x && x.length === 2) {
      result[x[0]] = x[1];
    }
  }
  return result;
};

module.exports = { parse_str };
