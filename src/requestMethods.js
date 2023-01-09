import axios from "axios";

const BASE_URL = "https://shopapi-iish.onrender.com/api/";
const storage = JSON.parse(localStorage.getItem("persist:primary"));
const user = storage != null ? JSON.parse(storage.user).currentUser : null;
const TOKEN = user != null ? user.accessToken : "";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});
export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: TOKEN },
});
