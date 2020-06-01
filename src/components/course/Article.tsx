import React, { useEffect, useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';

import ArticleContent from './ArticleContent'
import ArticleTOC from './ArticleTOC'
import 'highlight.js/styles/solarized-dark.css';
import apis from '../../store/apis'
import { COURSE_SUMMARY, UPDATE_TOC_DATA } from '../../store/gql-def'

export default function Article({ course: courseObj }: any) {
    const [course, setCourse]: any = useState({ activeArticle: {} })
    const [mdContent, setMDContent] = useState('');
    const [toc, setTOC] = useState({});
    const { data: summaryData, loading, error } = useQuery(
        COURSE_SUMMARY, {
        variables: {
            courseId: courseObj.id || 0
        }
    });

    const [updateTOC, { data }] = useMutation(UPDATE_TOC_DATA, {
        variables: { toc }
    })

    useEffect(() => {
        if (summaryData) {
            const realCourse = summaryData.course.summary;
            const newContent = apis.parseMD(realCourse, (html, ast) => {
                // updateTOC({variables: {toc: ast}})
                // setTOC(ast)
            });
            setCourse(realCourse)
            setMDContent(newContent);
        }
    }
    // , [summaryData]
    );
    return (
        <div className="whole-content-page">
            <div className="whole-content-sticky">
                <ArticleContent course={course} mdContent={mdContent}></ArticleContent>
                <ArticleTOC />
            </div>
        </div>
    )
}