import axios from "axios";

const FB_BASE_URL = "https://graph.facebook.com/";

const getFbUser = async (token) => {
    return new Promise((resolve, reject) => {
        resolve(axios.get(`${FB_BASE_URL}me?access_token=${token}&fields=id,name,email,picture.height(500)`));
    });
};

export default { getFbUser };
