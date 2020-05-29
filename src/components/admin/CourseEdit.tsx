import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apis from '../../store/apis'
import '../../assets/styles/admin/course-edit.less'
import { useParams, Redirect, Link } from 'react-router-dom';

export default () => {
    const [course, setCourse] = useState({ name: '', id: 0, summary: '', price: 0});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    let { courseId } = useParams();
    courseId = courseId || 0;
    useEffect(() => {
        (async () => {
            let courseObj = await apis.getCourseDetail(courseId);
            if (courseObj)
                setCourse(courseObj);
        })();
    }, [courseId])
    return (
        <div className="form-container">
            <h1>Course Edit</h1>
            <Link to="/admin">Back to list</Link>
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
                    const resp = await apis.saveCourse(values, courseId);
                    if (resp.error) {
                        setMessage(resp.message);
                    } else {
                        setCourse(resp);
                        setSaved(true)
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