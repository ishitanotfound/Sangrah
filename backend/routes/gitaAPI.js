const express = require('express');
const router = express.Router();

const gitaQuotes = [
  {
    eng: "You have the right to work, but never to the fruit of work.",
    author: "Krishna",
    chapter: "2",
    verse: "47"
  },
  {
    eng: "Change is the law of the universe. You can be a millionaire, or a pauper in an instant.",
    author: "Krishna",
    chapter: "2",
    verse: "14"
  },
  {
    eng: "Even a little progress on the path of truth can protect you from great fear.",
    author: "Krishna",
    chapter: "2",
    verse: "40"
  },
  {
    eng: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
    author: "Krishna",
    chapter: "6",
    verse: "19"
  }
];

router.get('/gitaquote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * gitaQuotes.length);
  res.json(gitaQuotes[randomIndex]);
});

module.exports = router;
