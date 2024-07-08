const mongoose = require("mongoose");

mongoose.connect('url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = mongoose.Schema({
    rollNumber: String,
    password: String,
});

const resultSchema = mongoose.Schema({
    rollNumber: String,
    name: String,
    school: String,
    marks: Number,
    qualified: Boolean,
});

const User = mongoose.model('User', userSchema);
const Result = mongoose.model('Result', resultSchema);

const seedData = async() => {}

module.exports = {
    todo
}