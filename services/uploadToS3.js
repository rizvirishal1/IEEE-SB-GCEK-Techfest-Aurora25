import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const addTimestampToFileName = (fileName) => {
    const timestamp = Date.now();
    const fileExtension = fileName.split(".").pop();
    const baseName = fileName.replace(`.${fileExtension}`, "");
    return `${baseName}-${timestamp}.${fileExtension}`;
};

const uploadFileToS3 = async (file, fileName, folderName) => {

    const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    const newFileName = addTimestampToFileName(fileName);

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${folderName}/${newFileName}`,
        Body: file.buffer,
    };

    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);

        const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folderName}/${newFileName}`;
        return fileUrl;
    } catch (error) {
        console.error("Error uploading file: ", error);
        throw error;
    }
};

export default uploadFileToS3;
