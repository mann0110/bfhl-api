const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

//hey if You want You can change the user info here

const USER_INFO = {
  full_name: "john_doe", //must be in lowercase
  birth_date: "17091999",
  email: "john@abc.com",
  roll_number: "ABCD123",
};

// POST /bfhl endpoint - Main logic

//Here I am Explaining the logic of the code At each Step

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        user_id: `${USER_INFO.full_name}_${USER_INFO.birth_date}`,
        message: "Invalid input: 'data' must be an array",
      });
    }

    // Initialize arrays and variables
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    const allAlphabets = [];

    // Process each item in the data array
    data.forEach((item) => {
      const itemStr = String(item);

      // Check if it's a number
      if (!isNaN(itemStr) && itemStr.trim() !== "") {
        const num = parseInt(itemStr);
        sum += num;

        if (num % 2 === 0) {
          evenNumbers.push(itemStr);
        } else {
          oddNumbers.push(itemStr);
        }
      }
      // Check if it's alphabetic characters
      else if (/^[a-zA-Z]+$/.test(itemStr)) {
        alphabets.push(itemStr.toUpperCase());
        // Store individual characters for concatenation logic
        for (let char of itemStr) {
          allAlphabets.push(char);
        }
      }
      // Everything else is considered special character
      else if (itemStr.length > 0) {
        // Check if it contains any non-alphanumeric characters
        if (/[^a-zA-Z0-9]/.test(itemStr)) {
          specialCharacters.push(itemStr);
        }
      }
    });

    // Create concatenation string with alternating caps in reverse order
    let concatString = "";
    if (allAlphabets.length > 0) {
      // Reverse the order of alphabets
      const reversedAlphabets = allAlphabets.reverse();

      // Apply alternating case (start with uppercase)
      reversedAlphabets.forEach((char, index) => {
        if (index % 2 === 0) {
          concatString += char.toUpperCase();
        } else {
          concatString += char.toLowerCase();
        }
      });
    }

    // Prepare response
    const response = {
      is_success: true,
      user_id: `${USER_INFO.full_name}_${USER_INFO.birth_date}`,
      email: USER_INFO.email,
      roll_number: USER_INFO.roll_number,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      user_id: `${USER_INFO.full_name}_${USER_INFO.birth_date}`,
      message: "Internal server error",
    });
  }
});

// Start server
//just to let you know that the server is running and ready to accept requests
// and also to display the user info IWrote All this.
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`👤 User ID: ${USER_INFO.full_name}_${USER_INFO.birth_date}`);
  console.log(`✅ Ready to accept requests!`);
});

module.exports = app;
