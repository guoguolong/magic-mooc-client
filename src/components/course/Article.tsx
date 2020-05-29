import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import ArticleContent from './ArticleContent'
import ArticleTOC from './ArticleTOC'
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor'
//  import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'
import hljs from 'highlight.js';
import 'highlight.js/styles/solarized-dark.css';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state: any) => {
    return {
        course: state.course,
    }
}

function parseMD(course: any, dispatch: any) {
    const mdContent = course.activeArticle ? course.activeArticle.content : '';

    function tocCallback(html: any, ast: any) {
        dispatch({
            type: 'TOC_REFRESH',
            ast
        })
    };

    const md: any = MarkdownIt({
        html: true,
        xhtmlOut: true,
        typographer: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) { }
            }

            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    }).use(MarkdownItAnchor, {
        permalink: true,
        permalinkBefore: true,
        // permalinkSymbol: '§',
    }).use(require('markdown-it-toc-done-right').default, {
        callback: tocCallback
    });
    return md.render(mdContent)
}

export default connect(mapStateToProps)(withRouter(Article))

function Article({ course, dispatch }: any) {
    const  [mdContent, setMDContent] = useState('');
    useEffect(() => {
        if (course.id) {
            const content = parseMD(course, dispatch);
            if (mdContent !== content) {
                setMDContent(content);
            }
        }
    }, [course]);
    return (
        <div className="whole-content-page">
            <div className="whole-content-sticky">
                <ArticleContent course={course} content={mdContent}></ArticleContent>
                <ArticleTOC />
            </div>
        </div>
    )
}