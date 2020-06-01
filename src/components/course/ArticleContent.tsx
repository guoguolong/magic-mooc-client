import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

const mapStateToProps = (state: any) => {
    return {
        activeTocHash: state.activeTocHash,
    }
}
export default connect(mapStateToProps)(ArticleContent)

function ArticleContent({ course, mdContent, activeTocHash }: any) {
    const location = useLocation();
    activeTocHash = location.hash || activeTocHash;
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
                    <h1>{course.activeArticle && course.activeArticle.name}</h1>
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