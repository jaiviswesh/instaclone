import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
    cloud_name: "dxd3akb9n",
    api_key: "196741793399689",
    api_secret: "UVgzHcYUtP4zsBpRlt1E3jyLJOo"
});
export default cloudinary;