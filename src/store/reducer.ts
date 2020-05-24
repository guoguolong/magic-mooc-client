import { combineReducers } from 'redux'

function setActiveArticle(articles: Array<any>, paths: Array<number>) {
    paths = paths || [];
    const currArticle = articles[paths[0]];
    if (!currArticle) return;
    currArticle.is_open = true;
    if (paths.length == 1) { // 路径中的最后一个节点(当前节点)
        currArticle.is_active = true;
    }
    if (currArticle.children) {
        setActiveArticle(currArticle.children, paths.slice(1));
    }
}

interface CouseState {
    articles: Array<any>,
    activeArticle: any
    path_ids_map: any,
    [propName: string]: any
}
function course(state: CouseState = {
    articles: [],
    activeArticle: {},
    path_ids_map: {},
}, action: any) {
    switch (action.type) {
        case 'COURSE_FETCHED':
            return Object.assign({}, state, action.course);
    }
    return state;
}

function activeTocHash(state = '', action: any) {
    switch (action.type) {
        case 'TOC_ACTIVATE':
            return action.tocHash;
    }
    return state;
}


function activeArticle(state = { id: 0 }, action: any) {
    switch (action.type) {
        case 'ARTICLE_ACTIVATE':
            return Object.assign({}, state, action.activeArticle);
    }
    return state;
}

function toc(state = {}, action: any) {
    switch (action.type) {
        case 'TOC_REFRESH':
            return Object.assign({}, state, action.ast) || {};
    }
    return state;
}

export default combineReducers({
    course,
    activeArticle,
    toc,
    activeTocHash,
})
