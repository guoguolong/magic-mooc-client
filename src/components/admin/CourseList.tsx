import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useQuery, useMutation} from '@apollo/react-hooks';
import { COURSE_LIST, COURSE_REMOVE } from '../../store/gql-def'
import '../../assets/styles/admin/course-list.less'

function CourseItem({item}:any) {
    const [remove] = useMutation(
        COURSE_REMOVE,
        {
          variables: { id: item.id },
          refetchQueries: [
            {
              query: COURSE_LIST
            },
          ]
        }
    );

    return (
        <li>
            <span>{item.id}</span>
            <span><Link to={'/admin/course/' + item.id}>{item.name}</Link></span>
            <span>¥{item.price}</span>
            <span className="summary" title={item.summary}>{item.summary}</span>
            <span className="button" onClick={async ()=> remove()}>[DELETE]</span>
        </li>
    )
}
export default () => {
    const [courses, setCourses] = useState([]);
    const { data, loading, error } = useQuery(
        COURSE_LIST
    );

    useEffect(() => {
        (async () => {
            if (data && data.course && data.course.list) {
                const list = data.course.list.map(item => {
                    return <CourseItem key={item.id} item={item} />
                })
                setCourses(list);
            }
        })();
    }, [data])

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p>;

    return (
        <div className="course-list">
            <h1>Course List</h1>
            <Link to="/admin/course">[New Course]</Link>
            <ul>
                {courses}
            </ul>
        </div>
    );
};