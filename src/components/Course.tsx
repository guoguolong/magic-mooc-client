import React, { useEffect, useState } from 'react'
import Article from './course/Article'
import Chapter from './course/Chapter'
import { useParams } from 'react-router-dom'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { COURSE_SUMMARY, ARTICLE_DETAIL } from '../store/gql-def'
import apis from '../store/apis'

export default function Course() {
    let { courseId, articleId } = useParams();
    // const [course, setCourse] = useState<any>({})
    const [, setArticle] = useState<any>({})

    articleId = (articleId || 0) / 1
    courseId = ((courseId || 0) / 1) || 10

    const { data: summaryData } = useQuery(
        COURSE_SUMMARY, { variables: { courseId } }
    );

    const { data: articleData } = useQuery(
        ARTICLE_DETAIL, { variables: { id: articleId } }
    );
    // console.info('------course func.')
    useEffect(() => {
        if (!summaryData) return;
        const articleObj = (articleData && articleData.article) && articleData.article.detail;
        const courseObj = apis.updateClientCourse(summaryData.course.summary, articleObj)

        // 神奇的语句，如果不设置该 state，course.activeArticle是旧的值
        setArticle(courseObj.activeArticle)
        // console.info('how causse. articleObj..', articleObj)
        // setCourse(courseObj);
        // console.error('Course courseObj>>>>', courseObj.id)
    }, [summaryData, articleData])
    return (
        <div className="body-container">
            <Chapter />
            <Article/>
        </div>
    )
}