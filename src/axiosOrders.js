import axios from 'axios'

const instance=axios.create({
    baseURL: 'https://burger-fa843.firebaseio.com/'
});

export default instance;