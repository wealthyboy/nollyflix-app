import client from "./client";

const search = (text) => client.get("https://nollyflix.tv/api/search", {q: text})

export default {
    search
}