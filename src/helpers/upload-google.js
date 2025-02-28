import sharp from "sharp";
import {nanoid} from "nanoid";
import {Storage} from "@google-cloud/storage";

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: "sa.json",
});
const bucketName = process.env.GCLOUD_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

// Function to resize image
const resizeImage = async (buffer) => {
    return sharp(buffer)
        .resize(1600, 900, {fit: "inside", withoutEnlargement: true})
        .toBuffer();
};

// Function to upload images
export async function uploadImages(files, uploadedBy) {
    if (!files || files.length === 0) {
        throw new Error("No files provided for upload.");
    }

    const uploadPromises = files.map(async (file) => {
        const buffer = await resizeImage(file.buffer);

        const metadata = await sharp(buffer).metadata();
        const fileExtension = metadata.format || "jpg";
        const fileName = `${nanoid()}.${fileExtension}`;
        const location = `https://storage.cloud.google.com/${bucketName}/${fileName}`;

        const fileRef = bucket.file(fileName);

        await fileRef.save(buffer, {
            metadata: {contentType: file.mimetype,},
        });

        return {location, uploadedBy, fileName};
    });

    return Promise.all(uploadPromises);
}

export const deleteImage = async (fileName) => {
    try {
        await storage.bucket(bucketName).file(fileName).delete();
        console.log('Image deleted successfully');
        return "Image deleted";
    } catch (err) {
        console.log("Remove image error: ",err);
        throw new Error("Remove Image failed.");
    }
};