import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { COURSE_DETAIL, COURSE_SAVE, COURSE_LIST } from '../../store/gql-def'
import '../../assets/styles/admin/course-edit.less'
import { useParams, Redirect, Link } from 'react-router-dom';

export default () => {
    const [course, setCourse] = useState({ name: '', id: 0, summary: '', price: 0 });
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    let { courseId } = useParams();
    courseId = courseId / 1;

    let courseResp;
    if (courseId) {
        courseResp = useQuery(
            COURSE_DETAIL,
            { variables: { id: courseId } }
        );
    }

    const [saveCourse] = useMutation(COURSE_SAVE);

    useEffect(() => {
        if (courseResp && courseResp.data) {
            setCourse(courseResp.data.course.detail);
        }
    }, [courseResp])

    return (
        <div className="form-container">
            <h1>Course Edit</h1>
            <Link to="/admin">[Back to list]</Link>
            <Formik
                enableReinitialize={true}
                initialValues={{ name: course.name, id: course.id, summary: course.summary, price: course.price }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .required('Title can not be empty'),
                    summary: Yup.string()
                        .max(500, 'Must be 500 characters or less')
                        .required('Summary can not be empty'),
                    price: Yup.string()
                        .required('Required'),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    values.price /= 1;
                    try {
                        await saveCourse({
                            variables: {
                                data: values,
                            },
                            update(cache, { data }) {
                                try {
                                    const { course } = cache.readQuery({ query: COURSE_LIST });
                                    cache.writeQuery({
                                        query: COURSE_LIST,
                                        data: { course: course.list.concat([data.course.save]) },
                                    });
                                } catch (e) {
                                    // cache COURSE_LIST could be empty.
                                }
                                setSaved(true); // redirect to /admin if it's true.
                            }
                        })
                    } catch (e) {
                        setMessage(e.message);
                    }
                }}
            >
                <Form className="course-form form">
                    {saved && <Redirect to="/admin" />}
                    {message && <div className="error">{message}</div>}
                    <div className="row">
                        <label htmlFor="name">Title: </label>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" />
                    </div>
                    <div className="row">
                        <label htmlFor="summary">Intro: </label>
                        <Field name="summary" as="textarea" />
                        <ErrorMessage name="summary" />
                    </div>
                    <div className="row">
                        <div><label htmlFor="price">Price: </label>
                            <Field name="price" type="text" /></div>
                        <div><ErrorMessage name="price" /></div>
                    </div>
                    <div className="row center">
                        <button type="submit">Save</button>
                    </div>
                </Form>
            </Formik>
        </div >
    );
};