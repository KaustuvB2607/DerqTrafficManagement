const Admin = require("../DAO/adminSchema");

function updateAdmin(adminInfo, res) {
 
  let updatedAdmin = {};
  if (adminInfo.username) {
    updatedAdmin["username"] = adminInfo.username;
  }

  if (adminInfo.password) {
    updatedAdmin["password"] = adminInfo.password;
  }
  
  Admin.updateOne({"username": adminInfo.username}, {...updatedAdmin}, (err) => {
    if (err) res.json({ message: "Database error", type: "error" });
    else {
      res.status(200);
      res.json({
        message: "Updated",
        type: "Success",
        admin: {
          ...updatedAdmin
        },
      });
    }
  });
}

module.exports = updateAdmin;
