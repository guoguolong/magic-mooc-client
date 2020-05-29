export  interface Article {
    name: string,
}
export interface Course {
    name?: string,
    articles: Array<Article>,
    summary?: string,
    [propName: string]: any,
}
