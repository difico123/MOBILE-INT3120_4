import axios from "axios";
// const FB_BASE_URL = "http://192.168.43.182:5002/";
const FB_BASE_URL = "http://192.168.1.153:5002/";

const getFbUser = async (token) => {
    return axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`);
};
const test = async () => {
    return axios.get(`${FB_BASE_URL}api/healthcheck`);
};
const signUp = async (user) => {
    return axios.post(`${FB_BASE_URL}api/register`, user);
};
const signIn = async (user) => {
    return axios.post(`${FB_BASE_URL}api/login`, user);
};

const getUserInfo = async (token) => {
    let config = {
        headers: {
            authorization: `bearer ${token}`,
        },
    };
    return await axios.get(`${FB_BASE_URL}api/users/me`, config);
};

export default { getFbUser, test, signUp, signIn, getUserInfo };
