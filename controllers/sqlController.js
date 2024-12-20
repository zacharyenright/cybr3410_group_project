const db = require('../config/dbConfig');

// Fixed Query
exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`; // Parameterized query
  const params = [username, password]; // Array to hold parameters

  db.get(sql, params, (err, row) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.send("Error executing query.");
    }
    if (row) {
      // Redirect to the user's profile page using their user ID
      res.redirect(`/profile/${row.id}`);
    } else {
      res.send("Login failed.");
    }
  });
};

exports.search = (req, res) => {
  const searchQuery = req.body.searchQuery;

// Fixed Query
const sql = `SELECT * FROM users WHERE username LIKE ? OR profile LIKE ?`;
const params = [`%${searchQuery}%`, `%${searchQuery}%`];
db.all(sql, params, (err, rows) => {
    if (err) {
        console.error("Error executing query:", err.message);
        return res.render('search', { results: [] });
    }
    res.render('search', { results: rows });
});


  db.all(sql, [], (err, rows) => {
      if (err) {
          console.error("Error executing query:", err.message);
          return res.render('search', { results: [] });
      }
      res.render('search', { results: rows });
  });
};

// Fixed Query
exports.getProfile = (req, res) => {
  const userId = req.params.userId; // Get the user ID from the route parameters
  const sql = `SELECT * FROM users WHERE id = ?`; // Use parameterized query
  const params = [userId];

  db.get(sql, params, (err, row) => {
    if (err) {
      console.error("Error fetching user profile:", err.message);
      return res.send("Error fetching user profile.");
    }
    if (row) {
      // Do not send the password to the view
      const { password, ...userWithoutPassword } = row; // Exclude password
      res.render('profile', { user: userWithoutPassword }); // Pass the user data to the view
    } else {
      res.send("User not found."); // Handle case where no user is found
    }
  });
};

