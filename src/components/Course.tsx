import React, { useEffect, useState } from 'react'
import Article from './course/Article'
import Chapter from './course/Chapter'
import { useParams } from 'react-router-dom'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { COURSE_SUMMARY, ARTICLE_DETAIL } from '../store/gql-def'
import apis from '../store/apis'

export default function Course() {
    let { courseId, articleId } = useParams();
    const [course, setCourse] = useState<any>({})
    const [, setArticle] = useState<any>({})
    const [pageId, setPageId] = useState(0);

    articleId /= 1;
    courseId /= 1;
    courseId = courseId || 10;

    const { data: summaryData } = useQuery(
        COURSE_SUMMARY, { variables: { courseId } }
    );

    const { data: articleData } = useQuery(
        ARTICLE_DETAIL, { variables: { id: articleId } }
    );
    useEffect(() => {
        if (!summaryData || !articleData || !articleId || !courseId) return;
        const courseObj = apis.updateClientCourse(summaryData.course.summary, articleData.article.detail, articleId)

        // 神奇的语句，如果不设置该 state，course.activeArticle是旧的值
        setArticle(courseObj.activeArticle)

        setCourse(courseObj);
        setPageId(articleId);
    }, [summaryData, articleData, articleId, courseId])
    return (
        <div className="body-container">
            <Chapter />
            <Article course={course} />
        </div>
    )
}