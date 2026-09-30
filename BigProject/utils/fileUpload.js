const fs = require("fs/promises");
const { cloudinary } = require("../config/cloudConfig.js");

async function uploadFilesToCloudinary(folder, files) {
  const uploadedImages = [];

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder,
      allowed_formats: ["png", "jpg", "jpeg"],
    });

    uploadedImages.push({
      url: result.secure_url,
      filename: result.public_id,
    });
  }

  return uploadedImages;
}

async function deleteLocalFiles(files = []) {
  await Promise.all(
    files
      .filter((file) => file?.path)
      .map((file) => fs.unlink(file.path).catch(() => null))
  );
}

async function deleteCloudinaryImages(images = []) {
  await Promise.all(
    images
      .filter((image) => image?.filename)
      .map((image) => cloudinary.uploader.destroy(image.filename).catch(() => null))
  );
}

module.exports = {
  uploadFilesToCloudinary,
  deleteLocalFiles,
  deleteCloudinaryImages,
};
