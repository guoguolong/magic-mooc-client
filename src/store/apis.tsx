import ApolloClient from 'apollo-boost'
import config from './config';

// import { COURSE_LIST, COURSE_DETAIL, COURSE_SUMMARY, COURSE_SAVE, COURSE_REMOVE, ARTICLE_DETAIL } from './gql-bridge'

import { loader } from 'graphql.macro';
const COURSE_LIST = loader('./fixtures/course-list.gql');
const COURSE_DETAIL = loader('./fixtures/course-detail.gql');
const COURSE_SUMMARY = loader('./fixtures/course-summary.gql');
const COURSE_SAVE = loader('./fixtures/course-save.gql');
const COURSE_REMOVE = loader('./fixtures/course-remove.gql');
const ARTICLE_DETAIL = loader('./fixtures/article-detail.gql');

const courseClient = new ApolloClient({
    uri: config.baseApiUrl + 'course'
});

async function getCourseDetail(id: number) {
    id = id / 1;
    const resp = await courseClient.query({
        query: COURSE_DETAIL,
        variables: {
            id
        }
    })
    return resp.data.detail;    
}

async function getCourseList() {
    const resp = await courseClient.query({
        query: COURSE_LIST,
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
        const resp = await courseClient.mutate({
            mutation: COURSE_SAVE,
            variables: {
                data
            },
            update: (cache, { data }) => {
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
    const resp = await courseClient.mutate({
        mutation: COURSE_REMOVE,
        variables: {
            id
        }
    })
    return resp.data.remove;
}

async function getCourseSummary(courseId: number) {
    courseId = courseId / 1;
    let courseClient = new ApolloClient({
        uri: config.baseApiUrl + 'course'
    });
    const resp = await courseClient.query({
        query: COURSE_SUMMARY,
        variables: {
            courseId
        }
    })
    return resp.data.summary;
}

async function fetchArticle(articleId: number) {
    articleId = articleId / 1;
    const client = new ApolloClient({
        uri: config.baseApiUrl + 'article'
    });
    const resp = await client.query({
        query: ARTICLE_DETAIL,
        variables: {
            id: articleId
        }
    })
    return resp.data.detail
};

export default {
    getCourseDetail,
    getCourseList,
    getCourseSummary,
    saveCourse,
    deleteCourse,
    fetchArticle,
}