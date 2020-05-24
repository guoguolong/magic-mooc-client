import React, { useEffect } from 'react'
import Article from './course/Article'
import Chapter from './course/Chapter'
import actions from '../store/actions'
import { useRouteMatch, useParams } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state: any) => {
    return {
    }
}
export default connect(mapStateToProps)(Course)
function Course({ dispatch}: any) {
    let { courseId, articleId } = useParams();
    courseId = courseId || 10;
    useEffect(() => {
        dispatch(actions.fetchCourse(courseId, articleId))
    }, [courseId, articleId])
    return (
        <div className="body-container">
            <Chapter />
            <Article />
        </div>
    )
}