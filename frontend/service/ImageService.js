import APP from "../config/app";
const API = `${APP.BASE_API}common/upload`;

const uploadSingleImage = async (image) => {
  let filename = image.split("/").pop();
  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  formData.append("images", { uri: image, name: filename, type });

  return await fetch(API, {
    method: "POST",
    body: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

const uploadImages = async (images) => {
  let formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    let filename = images[i].split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    await formData.append("images", { uri: images[i], name: filename, type });
  }

  let res = await fetch(API, {
    method: "POST",
    body: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log("ERROR " + error);
    });
  return res;
};

export default { uploadImages, uploadSingleImage };
