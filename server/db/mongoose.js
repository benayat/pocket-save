const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://benayat:fmWAK3TLrJwHxr8@cluster0.ptwdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

// "mongodb+srv://benayat:fmWAK3TLrJwHxr8@bank-api-db.sncs8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
