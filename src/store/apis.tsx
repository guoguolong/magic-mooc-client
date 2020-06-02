import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor'
//  import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'
import hljs from 'highlight.js';

function iteratePathIds(articles: Array<any>, parentIds?: Array<number>) {
    let pathIdsMap: any = {}
    Object.values(articles).map(item => {
        parentIds = parentIds || []
        item.path_ids = parentIds.concat(item.id);
        pathIdsMap[item.id] = item.path_ids;

        item.is_open = false;
        item.is_active = false;
        if (item.children) {
            const b = iteratePathIds(item.children, item.path_ids);
            pathIdsMap = Object.assign(pathIdsMap, b)
        }
        return true;
    })
    return pathIdsMap;
}

function setActiveArticlePath(articles: Array<any>, paths: Array<number>) {
    paths = paths || [];
    // const currArticle = articles[paths[0]]; // for git branch 'master', it's a map
    const currArticle = articles.find(element => element.id === paths[0]);
    if (!currArticle) return;
    currArticle.is_open = true;
    if (paths.length === 1) { // 路径中的最后一个节点(当前节点)
        currArticle.is_active = true;
    }
    if (currArticle.children) {
        setActiveArticlePath(currArticle.children, paths.slice(1));
    }
}

function parseMD(article: any, callback: any) {
    const mdContent = article ? article.content : '';
    if (!mdContent) return mdContent;

    function tocCallback(html: any, ast: any) {
        callback(html, ast)
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

export default {
    parseMD,
    updateClientCourse: function(courseObj, articleObj) {
        let articleId = parseInt(courseObj.start_article_id);

        if (articleObj) {
            articleId = articleObj.id;
            courseObj.activeArticle = articleObj
        }

        // client state： is_open, is_active
        courseObj.path_ids_map = iteratePathIds(courseObj.articles);
        setActiveArticlePath(courseObj.articles, courseObj.path_ids_map[articleId])
        return courseObj;
    }
}