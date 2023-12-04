import axios from "axios"

export default axios.create({
    baseURL: 'https://inivata.codebeamer-x.com/cb/api/v3/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access key')}`,
    }


})




