import { request } from 'graphql-request'
import config from './config';

async function getCourseDetail(id:number) {
    id = id / 1;
    const query = `query($id: Int!){
        detail (id: $id){
            id,name,price,summary
        }
    }`;
    const resp = await request(config.baseApiUrl + 'course', query, {id: id});
    return resp.detail;
}

async function getCourseList() {
    const query = `query($pageNo: Int){
        list (pageNo: $pageNo){
            id,name,price,summary
        }
    }`;
    const resp = await request(config.baseApiUrl + 'course', query);
    return resp.list;
}

async function saveCourse(body:any, id?:number) {
    id = id || 0;
    id /= 1;
    const query = `
    mutation($data: CourseInputType!){
        save (data: $data){
            id, name, summary, price
        }
    }`;
    
    const data = {...body}
    data.price = data.price / 1;
    try {
        const resp = await request(config.baseApiUrl + 'course', query, {data});
        return resp.save;
    } catch(e) {
        return {
            error: 100,
            message: e.message
        }
    }
}

async function deleteCourse(id:number) {
    id /= 1;
    const query = `mutation($id: Int!){
        remove (id: $id){
            error, message
        }
    }`;
    const resp = await request(config.baseApiUrl + 'course', query, {id});
    return resp.remove;
}

export default {
    getCourseDetail,
    getCourseList,
    saveCourse,
    deleteCourse
}