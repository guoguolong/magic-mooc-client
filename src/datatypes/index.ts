export  interface Article {
    name: string,
}
export interface Course {
    name?: string,
    articles: Array<Article>,
    [propName: string]: any,
}
