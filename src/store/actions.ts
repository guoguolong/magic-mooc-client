import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag';
import { Course } from '../datatypes'
import config from './config';

function _iteratePathIds(articles: Array<any>, parentIds?: Array<number>) {
    let pathIdsMap: any = {}
    Object.values(articles).map(item => {
        parentIds = parentIds || []
        item.path_ids = parentIds.concat(item.id);
        pathIdsMap[item.id] = item.path_ids;
        if (item.children) {
            const b = _iteratePathIds(item.children, item.path_ids);
            pathIdsMap = Object.assign(pathIdsMap, b)
        }
        return true;
    })
    return pathIdsMap;
}

function _setActiveArticlePath(articles: Array<any>, paths: Array<number>) {
    paths = paths || [];
    // const currArticle = articles[paths[0]]; // for branch 'master', it's a map
    const currArticle = articles.find(element => element.id == paths[0]);
    if (!currArticle) return;
    currArticle.is_open = true;
    if (paths.length == 1) { // 路径中的最后一个节点(当前节点)
        currArticle.is_active = true;
    }
    if (currArticle.children) {
        _setActiveArticlePath(currArticle.children, paths.slice(1));
    }
}
async function _fetchArticle(articleId: number) {
    articleId = articleId / 1;
    const client = new ApolloClient({
        uri: config.baseApiUrl + 'article'
    });
    const resp = await client.query({
        query: gql`
            query($id: Int!){
                detail (id: $id){
                    id,name,content
                }
            }
        `,
        variables: {
            id: articleId
        }
    })
    return resp.data.detail
};

export function fetchCourse(courseId?: number, articleId?: number) {
    courseId = courseId || 10;
    let course: Course = {
        articles: []
    };
    return async function (dispatch: any) {
        courseId = courseId / 1;
        const client = new ApolloClient({
            uri: config.baseApiUrl + 'course'
        });
        const resp = await client.query({
            query: gql`
                query($courseId: Int!){
                    summary (id: $courseId) {
                        id,name,summary,start_article_id,activeArticle{
                                id,name,content
                            },articles {
                            id,name,seq, parent_id,level,children {
                                id,name,seq,parent_id,level,children {
                                    id,name,seq,parent_id,level
                                }
                            }
                        }
                    }
                }
            `,
            variables: {
                courseId
            }
        })

        course = resp.data.summary;

        if (!articleId) {
            articleId = parseInt(course.start_article_id);
        } else {
            course.activeArticle = await _fetchArticle(articleId);
        }

        course.path_ids_map = _iteratePathIds(course.articles);
        _setActiveArticlePath(course.articles, course.path_ids_map[articleId])

        dispatch({
            type: 'COURSE_FETCHED',
            course: course
        })
    }
};

export default {
    fetchCourse,
}