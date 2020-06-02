import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { FETCH_TOC } from '../../store/gql-def'

export default function ArticleTOC() {
    const apolloClient = useApolloClient();
    const location  = useLocation();
    const anchorHash = location.hash.slice(1);

    const { data } = useQuery(FETCH_TOC);
    let renderedToc;
    if (data) {
        renderedToc = renderToc(data.toc, anchorHash);
    }
    useEffect(()=>{
        // setTimeout(() => {
        //     win.utils.activateTOCAnchor(anchorHash, true)
        // }, 1000)
        win.utils.activateTOCAnchor(anchorHash, true)
        apolloClient.writeData({data: {activeTocHash: anchorHash}})
        // apolloClient.writeQuery({ query: FETCH_ACTIVE_TOC_HASH, data: {activeTocHash: anchorHash} });
    }, [anchorHash])
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

    let activeName = (toc.n && activeAnchorHash === anchorHash) ? 'active' : ''

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