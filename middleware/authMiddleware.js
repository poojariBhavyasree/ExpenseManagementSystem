const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    // 👇 Add this
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No token provided."
        });
    }

    const token = authHeader.split(" ")[1];

    // 👇 Add these
    console.log("Token:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 👇 Add this
        console.log("Decoded Token:", decoded);

        req.user = decoded;

        next();

    } catch (err) {

        // 👇 Add this
        console.log("JWT Error:", err.message);

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

};

module.exports = verifyToken;