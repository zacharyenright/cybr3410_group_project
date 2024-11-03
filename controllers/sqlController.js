const db = require('../config/dbConfig');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`; // Use parameterized query
  const params = [username, password];

  db.get(sql, (err, row) => {
    if (err) return res.send("Error executing query.");
    if (row) res.send(`Welcome, ${row.username}! Profile: ${row.profile}`);
    else res.send("Login failed.");
  });
};

exports.search = (req, res) => {
  const searchQuery = req.body.searchQuery;

//   ## Vulnerable SQL query
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

exports.getProfile = (req, res) => {
  const userId = req.params.userId; // Get the user ID from the route parameters
  const sql = `SELECT * FROM users WHERE id = ?`; // Parameterized query
  const params = [userId]; // Array to hold parameters
  
  db.get(sql, (err, row) => {
      if (err) {
          console.error("Error fetching user profile:", err.message);
          return res.send("Error fetching user profile.");
      }
      if (row) {
          res.render('profile', { user: row }); // Pass the user data to the view
          res.render('profile', { password: row }); // Pass the password data to the view
      } else {
          res.send("User not found."); // Handle case where no user is found
      }
  });
};