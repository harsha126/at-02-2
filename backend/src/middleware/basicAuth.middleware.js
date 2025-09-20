export const basicAuth = (username, password) => {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Basic ")) {
            res.setHeader("WWW-Authenticate", "Basic");
            return res.status(401).send("Authentication required");
        }

        const base64Credentials = authHeader.split(" ")[1];
        const credentials = Buffer.from(base64Credentials, "base64").toString(
            "ascii"
        );
        const [user, pass] = credentials.split(":");

        if (user === username && pass === password) {
            return next();
        }

        return res.status(403).json({ message: "Invalid Credentials" });
    };
};
