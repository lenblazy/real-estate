import jwt from 'jsonwebtoken';

export const requireSignIn = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

        req.user = decoded;

         next();
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};