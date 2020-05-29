import { combineReducers } from 'redux'

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
