const mongoose = require("mongoose");
const OCR = require("../utils/ocr");
const OCR2 = require("../utils/ocrWithApi");
const ObjectId = mongoose.Types.ObjectId;
const Budget = require("./budgetModel");
const Family = require("./familyModel");
const transactionSchema = new mongoose.Schema({
  ownerBudget: {
    type: ObjectId,
    ref: "budget",
    default: null,
    autopopulate: true,
  },
  familyBudget: {
    type: ObjectId,
    ref: "budget",
    default: null,
    autopopulate: true,
  },
  transactionType: {
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
  category: {
    type: String,
    enum: ["gas", "food", "clothing", "hygiene", "other"],
    required: true,
  },
  amount: {
    type: Number,
  },
  scan: {
    type: String,
    default: null,
  },
});
/* 
what did I do here? 
before saving: 
updating balance, and income total of relevant budgets/
OCRed the document and got the total from the receipt.
*/
transactionSchema.pre("save", async function (next) {
  if (this.scan) {
    console.log("scanning receipt now");
    this.amount = await OCR2(this.scan);
    console.log(this.amount);
  }
  const familyBudget = await Budget.findById(this.familyBudget);
  const ownerBudget = await Budget.findById(this.ownerBudget);
  console.log(familyBudget, ownerBudget);
  if (this.transactionType == "expense") {
    if (ownerBudget.block === true) {
      throw new Error(
        "user budget is blocked, please call your admin to release"
      );
    } else if (ownerBudget.total - ownerBudget.balance < this.amount) {
      throw new Error("not enough funds");
    }
    this.amount *= -1;
  } else {
    this.familyBudget.incomeTotal += this.amount;
  }
  ownerBudget.balance += this.amount;
  familyBudget.balance += this.amount;
  await ownerBudget.save();
  await familyBudget.save();
  next();
});
transactionSchema.plugin(require("mongoose-autopopulate"));
const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;
// what do we have here?

/* 
owner - who did the transcation?
scan - file/string/link to s3/
amount - ocred from scan. 
transactionType - income or outcome?
category - if its expense, what kind?

*/

/* 
plans: improve OCR - either just crop the images and resize to fit fixed size, or smart-crop everything and just work.
about this-  need to first take care of authentication and then I can do transactions, because I need to find budget id's here.

*/
