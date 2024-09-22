import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dgsyuonxp",
  api_key: "414462944245925",
  api_secret: "nm5vgkdx4-LynAaKPsAciW9OQUc",
});

const storage = new multer.memoryStorage();

export const imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
};

export const upload = multer({ storage });
