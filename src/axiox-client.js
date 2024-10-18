import axios from "axios";
// import { CookiesProvider,useCookies } from "react-cookie";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})
    axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOEN')
    config.headers.Authorization = `Bearer ${token}`
        return config;
    })
    axiosClient.interceptors.response.use((response) =>{
        return response;
    },(error) =>{
        try{  
            const{response} = error;
            if(response.status === 401){
                localStorage.removeItem('ACCESS_TOKEN')
            }
        }catch(e){
            console.error(e);
        }
        throw error;
    }
    )
    axios.defaults.withCredentials = true;
    axios.get('/data')
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
export default axiosClient;