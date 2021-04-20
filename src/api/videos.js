import client from "./client";

const getVideos = () => client.get('https://nollyflix.tv/api/browse')
export default {
    getVideos,
}