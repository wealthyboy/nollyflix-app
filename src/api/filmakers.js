import client from "./client";

const filmakers = () => client.get('https://nollyflix.tv/api/browse/filmers')
export default {
    filmakers  
}