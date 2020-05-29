import React from 'react'

export default function Page() {
    return (
        <header className="header">
            <div className="header-left-column">
                <div className="mobile-button">
                    <i className="fas fa-bars"></i>
                </div>
                <div className="header-logo">
                    <div className="mobile-logo">
                        <a href="/" className="logo-link">
                            <img src="/assets/images/logo.svg" alt="logo" />
                        </a>
                    </div>
                    <div className="desktop-logo">
                        <a href="/" className="logo-link">
                            <img src="/assets/images/logo.svg" alt="logo" />
                        </a>
                    </div>
                </div>
                <div className="mobile-button">
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <div className="header-inner-wrapper">
                <div className="header-inner">
                    <div className="item">
                        <a href="/courses">
                            <span>Catalog</span>
                        </a>
                    </div>
                    <div className="item">
                        <a href="/">
                            <span>About</span>
                        </a>
                    </div>
                    <div className="item">
                        <a href="/">
                            <span>Term</span>
                        </a>
                    </div>
                    <div className="item">
                        <a href="/">
                            <span>Privacy</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="search-input-wrapper">
                <div className="input-container">
                    <i className="fa fa-search"></i>
                    <input placeholder="Search..." />
                </div>
            </div>
        </header>
    )
}