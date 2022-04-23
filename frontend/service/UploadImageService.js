import axios from "axios";
const API = "https://api.cloudinary.com/v1_1/dbiexlh94/image/upload";
const uploadImage = async (file) => {
  try {
    let config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const response = await axios.post(API, file, config);
    return response.data.secure_url;
  } catch (e) {
    return null;
  }
};

export default { uploadImage };
