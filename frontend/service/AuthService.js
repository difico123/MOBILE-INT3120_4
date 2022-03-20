import axios from "axios";

const FB_BASE_URL = "https://graph.facebook.com/";

const getFbUser = async (token) => {
    return axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`);
};

export default { getFbUser };
