const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const MOCKS_FILE = path.join(__dirname, 'mocks.json');

app.use(express.json());

// Helper function to read the mocks file
function readMocksFile() {
  if (!fs.existsSync(MOCKS_FILE)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(MOCKS_FILE, 'utf8'));
}

// Helper function to write to the mocks file
function writeMocksFile(data) {
  fs.writeFileSync(MOCKS_FILE, JSON.stringify(data, null, 2));
}

app.post('/mock', (req, res) => {
  const {methodName, params, response} = req.body;

  if (!methodName || !params || !response) {
    return res.status(400).json({
      error:
        'Invalid request body. Ensure methodName, params, and response are provided.',
    });
  }

  const mocksData = readMocksFile();

  // Initialize methodName array if not present
  if (!mocksData[methodName]) {
    mocksData[methodName] = [];
  }

  // Check if params already exist in the methodName array
  const existingIndex = mocksData[methodName].findIndex(
    mock => JSON.stringify(mock.params) === JSON.stringify(params),
  );

  if (existingIndex > -1) {
    // Replace existing item if params match
    mocksData[methodName][existingIndex] = {params, response};
  } else {
    // Add new item if params are different
    mocksData[methodName].push({params, response});
  }

  // Write updated data back to the file
  writeMocksFile(mocksData);

  res.status(200).json({message: 'Mock added/updated successfully.'});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
