"use strict";

const express = require("express");

var app = express();

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}
var jokes = [
  {
    content:
      'A child asked his father, "How were people born?" So his father  said, "Adam and Eve made babies, then their babies became adults and made babies, and so on.\n' +
      '"The child then went to his mother, asked her the same question and she told him, "We were monkeys then we evolved to become like we are now.\n' +
      '"The child ran back to his father and said, "You lied to me!" His father replied, "No, your mom was talking about her side of the family."',
    nameJoke: "a1",
  },
  {
    content:
      'Teacher: "Kids,what does the chicken give you?" Student: "Meat!" Teacher: "Very good! Now what does the pig give you?" Student: "Bacon!"\n' +
      'Teacher: "Great! And what does the fat cow give you?" Student: "Homework!"',
    nameJoke: "a2",
  },
  {
    content:
      'The teacher asked Jimmy, "Why is your cat at school today Jimmy?"\n' +
      'Jimmy replied crying, "Because I heard my daddy tell my mommy, "I am going to eat that pussy once Jimmy leaves for school today!"',
    nameJoke: "a3",
  },
  {
    content:
      'A housewife, an accountant and a lawyer were asked "How much is 2+2?" The housewife replies: "Four!". The accountant says: "I think it\'s either 3 or 4. Let me run those figures through my spreadsheet one more time." The lawyer pulls the drapes, dims the lights and asks in a hushed voice, "How much do you want it to be?"',
    nameJoke: "a4",
  },
];
function chooseOneRandom() {
  //print random jokes/day (not duplicate)
  let rsRandom = jokes[Math.floor(Math.random() * jokes.length)]; //random joke
  const index = jokes.indexOf(rsRandom);
  jokes.splice(index, 1); //not duplicate
  return rsRandom.nameJoke + "/" + rsRandom.content;
}
app.get("/", function (req, res) {
  res.send(chooseOneRandom());
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({ error: err.message });
});

app.use(function (req, res) {
  res.status(404);
  res.send({ error: "Sorry, can't find that" });
});

if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}
