import client from "./client";

const login = (email ,password) => client.post("https://nollyflix.tv/api/auth/login", {email, password})

export default {
    login,
}