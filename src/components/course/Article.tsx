import React, { useEffect, useState, useRef } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';

import ArticleContent from './ArticleContent'
import ArticleTOC from './ArticleTOC'
import 'highlight.js/styles/solarized-dark.css';
import apis from '../../store/apis'
import { COURSE_SUMMARY, ARTICLE_DETAIL, UPDATE_TOC_DATA, FETCH_TOC } from '../../store/gql-def'
import { useParams } from 'react-router-dom';

export default function Article() {
    const gqlClient = useApolloClient();
    let { courseId, articleId } = useParams()
    const [article, setArticle]: any = useState({ activeArticle: {} })
    const [mdContent, setMDContent] = useState('');
    const [toc, setTOC] = useState({});
    articleId = (articleId || 0) / 1
    courseId = ((courseId || 0) / 1) || 10

    const { data: summaryData, loading, error } = useQuery(
        COURSE_SUMMARY, {
        variables: {
            courseId: courseId || 0
        }
    });

    const { data: articleData } = useQuery(
        ARTICLE_DETAIL, {
        variables: {
            id: articleId || 0
        }
    });

    const [updateTOC, { data }] = useMutation(UPDATE_TOC_DATA, {
        variables: { toc }
    })

    useEffect(() => {
        if (!summaryData && !articleData) return;

        let realArticle;
        if (articleData && articleData.article.detail) {
            realArticle = articleData.article.detail;
        } else if (summaryData) {
            realArticle = summaryData.course.summary.activeArticle;
        }
        const newContent = apis.parseMD(realArticle, (html, ast) => {
            updateTOC({variables: {toc: ast}})
        });

        setArticle(realArticle)
        setMDContent(newContent);
    }, [articleData, summaryData]);
    return (
        <div className="whole-content-page">
            <div className="whole-content-sticky">
                <ArticleContent article={article} mdContent={mdContent}></ArticleContent>
                <ArticleTOC />
            </div>
        </div>
    )
}