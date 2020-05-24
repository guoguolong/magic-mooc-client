import React from 'react'
import '../assets/styles/catalog.less'

export default function () {
    // https://www.codecademy.com/catalog/subject/all
    return (
        <ul className="catalog">
            <li className="card-item">
                <a href="/course/10">
                    <div className="card-item-inner">
                        <div className="logo">
                            <img alt="course title" src="/assets/images/2.svg" />
                        </div>
                        <div className="summary">
                            <h3 className="title">
                                C Language
                            </h3>
                            <p className="intro">
                                Looking for an introduction to the theory behind programming? Master C while learning data structures, algorithms, and more!
                            </p>
                            <ul className="tags">
                                <li>C</li>
                                <li>Data Structure</li>
                                <li>Command Line</li>
                                <li>Git</li>
                            </ul>
                        </div>
                    </div>
                </a>
            </li>
            <li className="card-item">
                <a href="/course/20">
                    <div className="card-item-inner">
                        <div className="logo">
                            <img alt="course title" src="/assets/images/1.svg" />
                        </div>
                        <div className="summary">
                            <h3 className="title">
                            Foundation of CS
                            </h3>
                            <p className="intro">
                                Interested in learning how to code, but unsure where to start? This is the path for you!
                            </p>
                            <ul className="tags">
                                <li>Computer Science History</li>
                                <li>Career Exploration</li>
                                <li>Application</li>
                            </ul>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    )
}