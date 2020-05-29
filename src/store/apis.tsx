import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag';
import config from './config';

const coureClient = new ApolloClient({
    uri: config.baseApiUrl + 'course'
});

async function getCourseDetail(id: number) {
    id = id / 1;
    const resp = await coureClient.query({
        query: gql`
            query($id: Int!){
                detail (id: $id){
                    id,name,price,summary
                }
            }
        `,
        variables: {
            id
        }
    })
    return resp.data.detail;    
}

async function getCourseList() {
    const resp = await coureClient.query({
        query: gql`
            query($pageNo: Int){
                list (pageNo: $pageNo){
                    id,name,price,summary
                }
            }
        `,
        // fetchPolicy: 'network-only'
        // pageNo is an optional arguments, so 'varaibles' is not mandatory.
    })
    return resp.data.list;
}

async function saveCourse(body: any, id?: number) {
    id /= 1;
    const data = { ...body }
    data.price = data.price / 1;
    try {
        const resp = await coureClient.mutate({
            mutation: gql`
                mutation($data: CourseInputType!){
                    save (data: $data){
                        id, name, summary, price
                    }
                }
            `,
            variables: {
                data
            },
            update: (cache, { data }) => {
                const COURSE_LIST = gql`
                    query($pageNo: Int){
                        list (pageNo: $pageNo){
                            id,name,price,summary
                        }
                    }
                `;
                try {
                    let { list } = cache.readQuery({ query: COURSE_LIST });
                    list.push(data);
                    cache.writeQuery({
                        query: COURSE_LIST,
                        data: {
                            'list': list
                        }
                    });
                } catch (e) {
                    // We should always catch here,
                    // as the cache may be empty or the query may fail
                }
            }
        })
        return resp.data.save
    } catch (e) {
        return {
            error: 10,
            message: e.message
        }
    }
}

async function deleteCourse(id: number) {
    id /= 1;
    const resp = await coureClient.mutate({
        mutation: gql`
            mutation ($id: Int!){
                remove (id: $id){
                    error, message
                }
            }
        `,
        variables: {
            id
        }
    })
    return resp.data.remove;
}

export default {
    getCourseDetail,
    getCourseList,
    saveCourse,
    deleteCourse
}