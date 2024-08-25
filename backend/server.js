const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Utility function to separate numbers and alphabets from input data
const processData = (data) => {
  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = '';

  data.forEach((item) => {
    if (!isNaN(item)) {
      // Check if item is a number
      numbers.push(item);
    } else if (isNaN(item) && /^[A-Za-z]$/.test(item)) {
      // Check if item is an alphabet character
      alphabets.push(item);
      if (item >= 'a' && item <= 'z') {
        if (highestLowercaseAlphabet === '' || item > highestLowercaseAlphabet) {
          highestLowercaseAlphabet = item;
        }
      }
    }
  });

  return {
    numbers,
    alphabets,
    highestLowercaseAlphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
  };
};

// POST method endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input data"
    });
  }

  const { numbers, alphabets, highestLowercaseAlphabet } = processData(data);

  res.json({
    is_success: true,
    user_id: "kilaru Soma Sekhar",  // Replace with actual logic to generate user_id
    email: "somasekhar.21bce7019@vitapstudent.ac.in",         // Replace with actual email logic
    roll_number: "21BCE7019",        // Replace with actual roll number logic
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
  });
});

// GET method endpoint
app.get("/bfhl", (req, res) => {
  res.json({
    operation_code: 1
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
