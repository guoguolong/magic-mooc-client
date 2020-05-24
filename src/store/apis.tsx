import axios from 'axios'
import config from './config';

async function getCourseDetail(id:number) {
    const axioResp = await axios.get(config.baseApiUrl + 'course/detail/' + id);
    return axioResp.data;
}

async function deleteCourse(id:number) {
    const axioResp = await axios.get(config.baseApiUrl + 'course/delete/' + id);
    return axioResp.data;
}

async function getCourseList() {
    const axioResp = await axios.get(config.baseApiUrl + 'course/list');
    return axioResp.data;
}

async function courseSave(body:any, id?:number) {
    id = id || 0;
    const axioResp = await axios.post(config.baseApiUrl + 'course/save/' + id, body);
    return axioResp.data;
}

export default {
    getCourseDetail,
    getCourseList,
    courseSave,
    deleteCourse
}