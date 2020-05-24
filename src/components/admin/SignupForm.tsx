import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apis from '../../store/apis'
import '../../assets/styles/admin/index.less'

export default () => {
  const [course, setCourse] = useState({ name: '', id: 0, summary: '', price: 0 });
  useEffect(() => {
    (async () => {
      let courseObj = await apis.getCourseDetail(10);
      setCourse(courseObj);
    })();
  }, [])
  return (
    <div className="form-container">
      <Formik
        enableReinitialize={true}
        initialValues={course}
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="course-form form">
          <div className="row">
            <label htmlFor="name">标题：</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" />
          </div>
          <div className="row">
            <label htmlFor="summary">简介：</label>
            <Field name="summary" as="textarea" />
            <ErrorMessage name="summary" />
          </div>
          <div className="row">
          <div><label htmlFor="price">价格：</label>
            <Field name="price" type="text" /></div>
            <div><ErrorMessage name="price" /></div>
          </div>
          <div className="row center">
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};