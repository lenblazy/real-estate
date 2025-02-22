import User from "../models/user.js";

export const uploadImage = async (req, res) => {
    try {
        if (!req.files || req.files.length < 1) {
            return res.json({ error: "No file uploaded" });
        }

        // if only one file is uploaded, multer returns it as a simple object. not array
        const file = Array.isArray(req.files) ? req.files : [req.files];

        // upload image to s3



    } catch (err) {
        console.log("Current user error: ",err);
        res.send({error: "Upload Image failed."});
    }
};





