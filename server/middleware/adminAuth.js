import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ message: 'Unauthorized - Invalid credentials' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error authenticating', error: error.message });
    }
};

export default adminAuth;
