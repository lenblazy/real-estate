import {uploadImageToS3} from "../helpers/upload.js";

export const uploadImage = async (req, res) => {
    try {
        if (!req.files || req.files.length < 1) {
            return res.json({ error: "No file uploaded" });
        }

        // if only one file is uploaded, multer returns it as a simple object. not array
        const files = Array.isArray(req.files) ? req.files : [req.files];

        // upload image to s3
        const result = await uploadImageToS3(files, req.user._id);
        console.log("Upload results", result);
        res.json(result);
    } catch (err) {
        console.log("Current user error: ",err);
        res.send({error: "Upload Image failed."});
    }
};





