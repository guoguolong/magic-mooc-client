import React, { useEffect, useState, useRef } from 'react'
import { useQuery } from '@apollo/react-hooks';

import ArticleContent from './ArticleContent'
import ArticleTOC from './ArticleTOC'
import 'highlight.js/styles/solarized-dark.css';
import apis from '../../store/apis'
import { COURSE_SUMMARY } from '../../store/gql-api'

export default function Article({ course: courseObj }: any) {
    const [course, setCourse]: any = useState({ activeArticle: {} })
    const [mdContent, setMDContent] = useState('');
    const { data: summaryData, loading, error } = useQuery(
        COURSE_SUMMARY, {
        variables: {
            courseId: courseObj.id
        }
    }
    );
    useEffect(() => {
        if (summaryData) {
            const realCourse = summaryData.course.summary;
            const newContent = apis.parseMD(realCourse);
            setCourse(realCourse)
            setMDContent(newContent);
        }
    });
    return (
        <div className="whole-content-page">
            <div className="whole-content-sticky">
                <ArticleContent course={course} mdContent={mdContent}></ArticleContent>
                <ArticleTOC />
            </div>
        </div>
    )
}