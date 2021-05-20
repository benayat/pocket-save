// const ocrSpace = require("ocr-space-api-wrapper");
// const axios = require("axios");

const postProcessPrice = (text) => {
  const test = text
    .split(/\r?\n/g)
    .filter((line) => line !== "")
    .reverse()
    .find((line) => line.match(/grand total|total/i) && !line.match(/tax|sub/i))
    .match(/([0-9]*[.])?[0-9]+/g, "")[0];
  return test;
};

const axios = require("axios");
const FormData = require("form-data");
const OCR2 = async (image) => {
  var data = new FormData();
  data.append("language", "eng");
  data.append("isOverlayRequired", "false");
  data.append("base64image", image);
  data.append("isTable", "true");
  data.append("iscreatesearchablepdf", "false");
  data.append("issearchablepdfhidetextlayer", "false");

  var config = {
    method: "post",
    url: "https://api.ocr.space/parse/image",
    headers: {
      apikey: "c1cb2153c988957",
      ...data.getHeaders(),
    },
    data: data,
  };
  const result = await axios(config);
  const parsedText = result.data.ParsedResults[0].ParsedText;
  console.log("string: ", parsedText instanceof String);
  const price = postProcessPrice(parsedText);
  console.log("price: ", price);
  return price;
};

module.exports = OCR2;
