const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "root@123",
  port: 5432,
  database: "bakery",
});

client.connect();

// Function to get user by email and password
async function getUserByEmailAndPassword(email, password) {
  try {
    // Query to select user by email and password
    const query = {
      text: "SELECT * FROM users WHERE email = $1 AND password = $2",
      values: [email, password],
    };

    // Execute the query
    const result = await client.query(query);

    // Return the first row (user) from the result
    return result.rows[0];
  } catch (error) {
    // Handle any errors
    console.error("Error fetching user:", error);
    throw error; // Throw the error to be handled by the caller
  }
}

//register user
async function addUser(name, phoneno, email, password) {
  const query = {
    text: "INSERT INTO users(name, phoneno, email, password) VALUES($1, $2, $3, $4)",
    values: [name, phoneno, email, password],
  };

  try {
    const result = await client.query(query);
    return result.rowCount; // Returns the number of rows affected
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

module.exports = {
  addUser,
  getUserByEmailAndPassword,
};
