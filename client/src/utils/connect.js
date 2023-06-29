import Axios from 'axios';

export const downloadYoutube = (youtube_url) => 
{
    const url = process.env.REACT_APP_BACKEND_URL + '/download-youtube';
    const data = {
        youtube_url: youtube_url,
    };
    return Axios.post(url, data)
        .then(response => {
        return response.data;
        })
        .catch(error => {
        throw new Error(error.message);
        });
}

export const speechRecognition = (audioBlob, request_type, sub_subtitle_id, id) =>
{
    const url = process.env.REACT_APP_BACKEND_URL + '/speech-recognition';
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('request_type', request_type);
    formData.append('sub_subtitle_id', sub_subtitle_id);
    formData.append('id', id);
    return Axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        return response.data;
        })
        .catch(error => {
        throw new Error(error.message);
        });
}

export const chatGPT = (request_type, id, sub_subtitle_id, mission_type, model, prompt) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/chatGPT';
    const data = {
        request_type: request_type,
        id: id,
        sub_subtitle_id: sub_subtitle_id,
        mission_type: mission_type,
        model: model,
        prompt: prompt,
    };
    return Axios.post(url, data)
        .then(response => {
        return response.data;
        })
        .catch(error => {
        throw new Error(error.message);
        });
}

export const insertSubSubtitle = (youtube_id, start_time, end_time, text) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/insert-sub-subtitle'
    const data = {
        youtube_id: youtube_id,
        start_time: start_time,
        end_time: end_time,
        text: text,
    }
    return Axios.post(url, data)
    .then(response => {
        return response.data
    })
    .catch(error => {
        throw new Error(error.message);
    })
}

export const deleteSubSubtitle = (sub_subtitle_id) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/delete-sub-subtitle'
    const data = {
        sub_subtitle_id: sub_subtitle_id,
    }
    return Axios.post(url, data)
    .then(response => {
        return response.data
    })
    .catch(error => {
        throw new Error(error.message);
    })
}

export const selectSubSubtitle = (filename) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/select-sub-subtitle'
    const data = {
        filename: filename,
    }
    return Axios.post(url, data)
    .then(response => {
        return response.data
    })
    .catch(error => {
        throw new Error(error.message);
    })
}