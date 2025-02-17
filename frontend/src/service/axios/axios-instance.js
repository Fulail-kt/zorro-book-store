import axios from "axios"

console.log(process.env.NEXT_PUBLIC_BASE_URL,"je")
const axiosInstance=axios.create
({
    baseURL:process.env.NEXT_PUBLIC_BASE_URL
})

axiosInstance.interceptors.request.use((config)=>
{
    const token=localStorage.getItem('zr_token')
    if(token)
    {
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})

export default axiosInstance