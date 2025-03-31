import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.json({ success: false ,message: 'Unauthorized - No token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error authenticating', error: error.message });
    }
}

export default authUser;