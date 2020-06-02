import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';
import { COURSE_SUMMARY } from '../../store/gql-def'

export default function Chapter() {
    let course: any = {};

    let { courseId, articleId } = useParams();
    articleId = (articleId || 0) / 1
    courseId = ((courseId || 0) / 1) || 10

    const { data: summaryData } = useQuery(COURSE_SUMMARY, { variables: { courseId } });

    let list = [];
    if (summaryData) {
        list = iterate(summaryData.course.summary.articles, courseId, articleId);
    }

    return (
        <div className="content-nav" id="sidebar">
            <div className="content-nav-inner">
                <div className="course-name">{course.name}</div>
                <ul>
                    {list}
                </ul>
            </div>
        </div>
    )
}

function iterate(articleMap: Array<any>, courseId: string, activeArticleId: string, level?: number): any {
    level = level || 1;
    let articles = articleMap;
    articles = articles || []
    // Object.values(articleMap);
    articles = articles.sort(function (a: any, b: any): number {
        return (a.seq < b.seq) ? -1 : 1;
    })
    return articles.map((item: any) => {
        let subMenus = <></>;
        let iconStyle = 'fas';
        let aClass = item.parent_id ? '' : 'top';
        if (item.is_active) {
            aClass += ' active';
        }
        if (item.id === activeArticleId) {
            item.is_open = true;
            item.active = true;
        }
        if (item.children) {
            if (item.is_open) {
                iconStyle += ' fa-chevron-down'
                level = level || 1;
                subMenus = iterate(item.children, courseId, activeArticleId, level + 1);
            } else {
                iconStyle += ' fa-chevron-right'
            }
        }
        let url = `/course/${courseId}/${item.id}`;
        return <li key={item.name}>
            <Link className={aClass} to={url}>
                <span>{item.name}</span>
                {item.children ? <i className={iconStyle}></i> : ''}
            </Link>
            {!item.children ? '' :
                <ul className="sub-menu">
                    {subMenus}
                </ul>
            }
        </li>
    });
}