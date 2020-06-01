import gql from 'graphql-tag';

export const COURSE_LIST = gql`
    query ($pageNo: Int){
        course {
            list (pageNo: $pageNo){
                id,name,price,summary
            }
        }
    }
`;

export const COURSE_DETAIL = gql`
    query ($id: Int!){
        course {
            detail (id: $id){
                id,name,price,summary
            }
        }
    }
`;

export const COURSE_SUMMARY = gql`
    query CourseSummary($courseId: Int!){
        course {
            summary (id: $courseId) {
                id,name,summary,start_article_id,
                activeArticle{
                    id,name,content
                },
                articles {
                    is_open @client, is_active @client, id,name,seq, parent_id,level,children {
                        is_open @client, is_active @client, id,name,seq,parent_id,level,children {
                            is_open @client, is_active @client, id,name,seq,parent_id,level
                        }
                    }
                }
            }
        }
    }
`

export const COURSE_SAVE = gql`
    mutation ($data: CourseInputType!){
        course {
            save (data: $data){
                id, name, summary, price
            }
        }
    }
`

export const COURSE_REMOVE = gql`
    mutation CourseRemove($id: Int!){
        course {
            remove (id: $id){
                error, message
            }
        }
    }
`;

export const ARTICLE_DETAIL = gql`
    query ArticleDetail($id: Int!){
        article {
            detail (id: $id){
                id,name,content
            }
        }
    }
`
