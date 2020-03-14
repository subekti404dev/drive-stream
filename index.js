const axios = require("axios");
const { parse_str } = require("./util");

const getStream = async id => {
  const url = `https://docs.google.com/get_video_info?docid=${id}`;
  const res = await axios.get(url);
  const text = res.data;
  const result = {};
  const out = parse_str(text);
  if (out["status"] !== "ok")
    throw new Error(decodeURIComponent(out.reason.split("+").join(" ")));
  const data = decodeURIComponent(out["fmt_stream_map"]).split(",");
  for (let i = 0; i < data.length; i++) {
    const str = data[i];
    let resolution;
    switch (parseInt(str.substr(0, 2))) {
      case 18:
        resolution = "360P";
        break;
      case 22:
        resolution = "720P";
        break;
      case 37:
        resolution = "1080P";
        break;
      case 59:
        resolution = "480P";
        break;
      default:
        break;
    }
    result[resolution] = decodeURIComponent(str.substr(3));
  }
  
  let cookie;
  if (res.headers["set-cookie"]) {
    const coo = res.headers["set-cookie"].find(s => s.includes("DRIVE_STREAM"));
    cookie = coo.split(";").find(c => c.includes("DRIVE_STREAM"));
  }
  result["cookie"] = cookie;
  return result;
};

module.exports = { getStream };
