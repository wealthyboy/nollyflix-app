import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const apiClient = create({
    baseUrl: 'https://nollyflix.tv/api',
})


apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await authStorage.getToken()
    if (!authToken) return;
    request.headers["Authorization"] = 'Bearer '+ authToken
})

const get = apiClient.get;

apiClient.get = async (url , params, axiosConfig) => {
    const res = await  get(url , params, axiosConfig)
    if (res.ok) {
       cache.store(url,res.data)
       return res;
    }
    const data = cache.get(url)
   
   return data ? {ok: true, data } : res;
}

export default apiClient;

