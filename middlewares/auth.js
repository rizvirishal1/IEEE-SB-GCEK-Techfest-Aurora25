//imports...
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
    try {

        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, userPlainObject) => {

                if (userPlainObject == undefined) {
                    return res.status(401).json({ error: "Session expired. Please Login" });
                }

                else if (err) {
                    return res.status(403).json({ error: "Token is invalid" });
                }

                res.user = userPlainObject;
                next();
            },
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }

};

export default authenticateToken;
