const fs = require("fs");
const util = require("util");
const sharp = require("sharp");
// const rectangles = [
//   { left: 0, top: 450, width: 750, height: 550 },
//   // { left: 30, bottom: 550, width: 710, height: 250 },
// ];

const { createWorker } = require("tesseract.js");
const preProcessImage = async (image) => {
  const pipeline = await sharp(image)
    .normalise()
    .sharpen()
    .resize({ width: 750 })
    // .trim(200)
    // .threshold()
    .toBuffer();
  // .toFile("outputSharpened.jpg");
  return pipeline;
};

//planning:
// doing this again with rectangles. this way I can read bigger fonts.
async function recognize(file) {
  console.log("recognize running now");
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const values = [];
  const {
    data: { text },
  } = await worker.recognize(file);
  values.push(text);

  await worker.terminate();
  return values;
}
const postProcessPrice = (text) => {
  const test = text
    .split(/\r?\n/g)
    .filter((line) => line !== "")
    .reverse()
    .find((line) => line.match(/grand total|total/i) && !line.match(/tax|sub/i))
    .match(/([0-9]*[.])?[0-9]+/g, "")[0];
  return test;
};
// const postProcessCompany = (text) => {
//   const filtered = text.split(/\r?\n/g).filter((line) => line !== "")[0];
//   // console.log(filtered);
//   return filtered;
// };

const OCR = async (image) => {
  console.log("getting image");
  image = image.split("base64,")[1];
  console.log("getting buffer");
  let imageBuffer = Buffer.from(image, "base64");
  console.log("sharpenning image");
  const processed = await preProcessImage(imageBuffer);
  console.log("recognizing image");
  const doc = await recognize(processed);
  console.log(doc[0]);
  console.log("getting price");
  const filteredPrice = postProcessPrice(doc[0]);
  // console.log(filteredPrice);
  // const filteredCompany = postProcessCompany(doc[1]);
  // console.log({ price: filteredPrice, company: filteredCompany });
  // console.log(filteredPrice);
  return filteredPrice;
};
module.exports = OCR;
