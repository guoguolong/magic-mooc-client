import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import apis from '../../store/apis'
import '../../assets/styles/admin/course-list.less'

function CourseItem({item, updateCourses}:any) {
    return (
        <li>
            <span>{item.id}</span>
            <span><Link to={'/admin/course/' + item.id}>{item.name}</Link></span>
            <span>¥{item.price}</span>
            <span className="summary" title={item.summary}>{item.summary}</span>
            <span className="button" onClick={async ()=>{
                 const resp = await apis.deleteCourse(item.id)
                 if (!resp.error) {
                     updateCourses(item.id)
                 }
            }}>[DELETE]</span>
        </li>
    )
}
export default () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        (async () => {
            function updateCourses(id:number) {
                courseList = courseList.filter(it=> {
                    return (it.id != id)
                })

                const compList = courseList.map(it=> {
                    return <CourseItem key={it.id} item={it} updateCourses={updateCourses} />
                })

                setCourses(compList);
            }
            let courseList = await apis.getCourseList();

            const list = courseList.map(item => {
                return <CourseItem key={item.id} item={item} updateCourses={updateCourses} />
            })
            setCourses(list);
        })();
    }, [])
    return (
        <div className="course-list">
            <h1>Course List</h1>
            <Link to="/admin/course">New Course</Link>
            <ul>
                {courses}
            </ul>
        </div>
    );
};