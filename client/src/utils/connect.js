import Axios from 'axios';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return "error";
    }
    const headers = {
        Authorization: `Token ${token}`
    };
    return headers
}

export const downloadYoutube = async (user_id, youtube_url) => 
{
    const url = process.env.REACT_APP_BACKEND_URL + '/download-youtube';
    const data = {
        user_id: user_id,
        youtube_url: youtube_url,
    };
    try {
        const response = await Axios.post(url, data, {headers: getHeaders()})
        return response.data
    } catch(error) {
        throw new Error(error.message);
    }
}

export const speechRecognition = (user_id, audioBlob, request_type, sub_subtitle_id, id) =>
{
    const token = localStorage.getItem('token');
    if (!token) {
        return "error";
    }

    const url = process.env.REACT_APP_BACKEND_URL + '/speech-recognition';
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('request_type', request_type);
    formData.append('user_id', user_id)
    formData.append('sub_subtitle_id', sub_subtitle_id);
    formData.append('id', id);
    return Axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`
        }
    }).then(response => {
        return response.data;
    })
    .catch(error => {
        throw new Error(error.message);
        });
}

export const chatGPT = async(user_id, request_type, id, sub_subtitle_id, mission_type, model, prompt) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/chatGPT';
    const data = {
        user_id: user_id,
        request_type: request_type,
        id: id,
        sub_subtitle_id: sub_subtitle_id,
        mission_type: mission_type,
        model: model,
        prompt: prompt,
    };
    return Axios.post(url, data, {headers: getHeaders()})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error.message);
        });
    }

export const insertSubSubtitle = async (user_id, youtube_id, start_time, end_time, text) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/insert-sub-subtitle'
    const data = {
        user_id: user_id,
        youtube_id: youtube_id,
        start_time: start_time,
        end_time: end_time,
        text: text,
    }
    try {
        const response = await Axios.post(url, data, {headers: getHeaders()})
        return response.data
    } catch(error) {
        throw new Error(error.message);
    }
}

export const deleteSubSubtitle = async (user_id, sub_subtitle_id) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/delete-sub-subtitle'
    const data = {
        user_id: user_id,
        sub_subtitle_id: sub_subtitle_id,
    }
    try {
        const response = await Axios.post(url, data, {headers: getHeaders()})
        return response.data
    } catch(error) {
        throw new Error(error.message);
    }
}

export const removeBookmark = async (user_id, youtube_id) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/remove_bookmark'
    const data = {
        user_id: user_id,
        youtube_id: youtube_id
    }
    try {
        const response = await Axios.post(url, data, {headers: getHeaders()})
        return response.data
    } catch(error) {
        throw new Error(error.message);
    }
}

export const addBookmark = async (user_id, youtube_id) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/add_bookmark'
    const data = {
        user_id: user_id,
        youtube_id: youtube_id
    }
    try {
        const response = await Axios.post(url, data, {headers: getHeaders()})
        return response.data
    } catch(error) {
        throw new Error(error.message);
    }
}

export const selectAllBookmarks = async (user_id) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/select_all_bookmarks'
    const data = {
        user_id: user_id,
    }
    try {
        const response = await Axios.post(url, data, {headers: getHeaders()})
        return response.data
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getStatistic = async (user_id) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/get_statistic'
    const data = {
        user_id: user_id,
    }
    try {
        const response = await Axios.post(url, data, {headers: getHeaders()})
        return response.data
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getTasks = async (user_id) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/get_tasks'
    const data = {
        user_id: user_id
    }
    try {
        const response = await Axios.post(url, data, {headers: getHeaders()})
        return response.data
    } catch(error) {
        throw new Error(error.message);
    }
}

export const shutDown = async () => {
    const url = process.env.REACT_APP_BACKEND_URL + '/shut_down'
    const data = {}
    try {
        const response = await Axios.post(url, data, {headers: getHeaders()})
        return response.data
    } catch(error) {
        throw new Error(error.message);
    }
}

export const login = async (username, password) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/login';
    const data = {
        username: username,
        password: password
    }
    try {
        const response = await Axios.post(url, data);
        console.log(response)
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        console.log('login',localStorage)
        return response.data.userId;
    } catch(error) {
        console.log(error.message);
        return "error";
    }
}

