import client from "./client";

const register = (userInfo) => client.post("https://nollyflix.tv/api/auth/register",userInfo)

export default { register }