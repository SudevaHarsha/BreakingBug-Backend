const jwt = require("jsonwebtoken");

const createNewToken = (userId) => {
    return jwt.sign({ userId: userId }, process.env.SECRET_KEY, { expiresIn: '10d' });  // removed .getuuid
}

module.exports = { createNewToken };  // added export
