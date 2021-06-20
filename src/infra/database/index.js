import mongoose from "mongoose";

// connectDB: responsible for database connection using mongoose,
// @param(dbURL): url for database
function connect(dbURL) {
  return mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true, // To remove ensureIndex() warning if used
    useUnifiedTopology: true, //To use the new Server Discover and Monitoring engine
    useFindAndModify: false, // disable find and modify
  });
}

export { connect };
