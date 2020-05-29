import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

const mapStateToProps = (state: any) => {
    return {
        toc: state.toc
    }
}

export default connect(mapStateToProps)(ArticleTOC)
function ArticleTOC({ toc, dispatch }: any) {
    const location  = useLocation();
    const anchorHash = location.hash.slice(1);
    const renderedToc = renderToc(toc, anchorHash);
    useEffect(()=>{
        win.utils.activateTOCAnchor(anchorHash, true)
        dispatch({
            type: "TOC_ACTIVATE",
            tocHash: activeTocHash
        })
    })
    return (
        <div className="page-side">
            <div className="sticky-container">
                <div className="toc-wrapper">
                    <div className="toc-inner">
                        <div className="toc-inner-content">
                            <div className="indicator" id="indicator"></div>
                            <div className="toc-header">
                                <i className="fas fa-list-ul toc-icon"></i>
                                <span className="toc-title">CONTENTS</span>
                            </div>
                            <div className="toc-content">
                                <ul className="toc-items">
                                    {renderedToc}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

let activeTocHash = '';
const win:any = window;
function renderToc(toc: any, activeAnchorHash: string) {
    if (!toc || !toc.c || !toc.c.length) return;
    if (!activeAnchorHash) {
        activeAnchorHash = win.utils.createHashByTOCName(toc.c[0].n); 
    }

    const content = toc.c.map((subToc: any) => {
        return <RenderTocItem level="1" key={subToc.n} toc={subToc} activeAnchorHash={activeAnchorHash} />;
    })
    return (content);
}

function RenderTocItem({ level, toc, activeAnchorHash }: any) {
    activeAnchorHash = activeAnchorHash || '';
    let anchorHash = win.utils.createHashByTOCName(toc.n);
    let tocAnchorHash = win.utils.createTOCAnchorNameByHash(anchorHash);
    win.tocs.push(anchorHash)

    let activeName = (toc.n && activeAnchorHash == anchorHash) ? 'active' : ''
    if (activeName) {
        activeTocHash = anchorHash
    }

    let subTocContent = [];
    if (toc.c) {
        subTocContent = toc.c.map((subToc: any) => {
            return <RenderTocItem key={subToc.n} toc={subToc} activeAnchorHash={activeAnchorHash} />;
        })
    }
    return (
        <li id={tocAnchorHash}>
            <a href={'#' + anchorHash} onClick={()=>{
                win.utils.activateTOCAnchor(anchorHash, true)
            }} className={activeName}><div>{toc.n}</div></a>
            {subTocContent.length > 0 &&
                <ul>
                    {subTocContent}
                </ul>
            }
        </li>
    );
}