// import {deleteImageFromS3, uploadImageToS3} from "../helpers/upload.js";
import {deleteImage, uploadImages} from "../helpers/upload-google.js";

export const uploadImage = async (req, res) => {
    try {
        if (!req.files || req.files.length < 1) {
            return res.json({ error: "No file uploaded" });
        }

        // if only one file is uploaded, multer returns it as a simple object. not array
        const files = Array.isArray(req.files) ? req.files : [req.files];
        // upload image to s3
        const result = await uploadImages(files, req.user._id);
        res.json(result);
    } catch (err) {
        console.log("Upload image error: ",err);
        res.send({error: "Upload Image failed."});
    }
};

export const removeImage = async (req, res) => {
    try {
        const { fileName, uploadedBy } = req.body;

        // check if the current user id matches the uploadedBy id
        if (req.user._id !== uploadedBy) {
            return res.status(401).json({ error: "UnAuthorized" });
        }

        //remove image
        const result = await deleteImage(fileName);
        return res.json({ error: result });
    } catch (err) {
        console.log("Remove image error: ",err);
        res.send({error: "Remove Image failed."});
    }
};

export const createAd = async (req, res) => {
    try {
       const { address } = req.body;

       if (!address.trim()) {
           return res.json({ error: "Address is required" });
       }

       const { location, googleMap } = await geocodeAddress(address);
       res.json({location, googleMap});

    } catch (err) {
        console.log("Remove image error: ",err);
        res.send({error: "Remove Image failed."});
    }
};





