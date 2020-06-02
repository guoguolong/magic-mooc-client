import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_ACTIVE_TOC_HASH } from '../../store/gql-def'

export default function ArticleContent({ article, mdContent }: any) {
    const location = useLocation();
    let { data } = useQuery(FETCH_ACTIVE_TOC_HASH);

    const activeTocHash = location.hash || (data && data.activeTocHash);
    let win:any = window;

    useEffect(() => {
        if (!mdContent) return;
        if (activeTocHash && location.hash) {
            const tObj: any = document.getElementById(activeTocHash.replace(/^#/, ''));
            if (tObj) {
                win.removeEventListener("scroll", win.utils.scrollPosition);
                window.scrollTo({
                    left: 0,
                    top: tObj.offsetTop,
                    behavior: 'smooth'
                })
                window.onscroll = (e:any) => {
                    let currentScrollOffset = window.pageYOffset || document.documentElement.scrollTop
                    if (currentScrollOffset === tObj.offsetTop) {
                        window.onscroll = null;
                        win.addEventListener("scroll", win.utils.scrollPosition);
                    }
                }
                // setTimeout(function(){
                //     win.addEventListener("scroll", win.utils.scrollPosition);
                // }, 2000)
            }
        }

    })
    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-inner">
                    <h1>{article && article.name}</h1>
                    <i className="fas fa-list-ul mobile-toc-icon"></i>
                </div>
            </div>
            <div className="page-body" dangerouslySetInnerHTML={{ __html: mdContent }}>
            </div>
            <div className="page-footer">
            </div>
        </div>
    )
}