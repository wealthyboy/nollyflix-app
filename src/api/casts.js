import client from "./client";

const casts = () => client.get('https://nollyflix.tv/api/browse/casts')
export default {
    casts  
}