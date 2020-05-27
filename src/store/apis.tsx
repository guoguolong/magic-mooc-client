import { request } from 'graphql-request'
import config from './config';

async function getCourseDetail(id:number) {
    id = id / 1;
    const query = `query($id: Int!){
        detail (id: $id){
            id,name,price,summary
        }
    }`;
    const resp = await request(config.baseApiUrl + 'lession', query, {id: id});
    return resp.detail;
}

async function getCourseList() {
    const query = `query($pageNo: Int){
        list (pageNo: $pageNo){
            id,name,price,summary
        }
    }`;
    const resp = await request(config.baseApiUrl + 'lession', query);
    return resp.list;
}

async function saveCourse(body:any, id?:number) {
    id = id || 0;
    id /= 1;
    const query = `
    mutation($data: CourseInputType!){
        save (data: $data){
            id, name
        }
    }`;
    
    const data = {...body}
    data.price = data.price / 1;
    const resp = await request(config.baseApiUrl + 'lession', query, {data});
    return resp.save;
}

async function deleteCourse(id:number) {
    id /= 1;
    const query = `mutation($id: Int!){
        remove (id: $id){
            error, message
        }
    }`;
    const resp = await request(config.baseApiUrl + 'lession', query, {id});
    return resp.remove;
}

export default {
    getCourseDetail,
    getCourseList,
    saveCourse,
    deleteCourse
}