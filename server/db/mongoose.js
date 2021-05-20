const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/pocketSave", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// "mongodb+srv://benayat:fmWAK3TLrJwHxr8@bank-api-db.sncs8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
