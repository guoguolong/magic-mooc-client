import React from 'react';
import { Formik, Form, useField } from 'formik';
import styled from '@emotion/styled';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <StyledErrorMessage>{meta.error}</StyledErrorMessage>
            ) : null}
        </>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    const fld: any = { ...props, type: 'checkbox' };
    const [field, meta] = useField(fld);
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

// Styled components ....
const StyledSelect = styled.select();
const StyledErrorMessage = styled.div({
    color: 'red'
})

const StyledLabel = styled.label();

const MySelect = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
        <>
            <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
            <StyledSelect {...field} {...props} />
            {meta.touched && meta.error ? (
                <StyledErrorMessage>{meta.error}</StyledErrorMessage>
            ) : null}
        </>
    );
};

// And now we can use these
export default () => {
    return (
        <>
            <h1>Subscribe!</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    acceptedTerms: false, // added for our checkbox
                    jobType: '', // added for our select
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    acceptedTerms: Yup.boolean()
                        .required('Required')
                        .oneOf([true], 'You must accept the terms and conditions.'),
                    jobType: Yup.string()
                        .oneOf(
                            ['designer', 'development', 'product', 'other'],
                            'Invalid Job Type'
                        )
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form className="form">
                    <div className="row">
                        <MyTextInput
                            label="First Name"
                            name="firstName"
                            type="text"
                            placeholder="Jane"
                        />
                    </div>
                    <div className="row">
                        <MyTextInput
                            label="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                        />
                    </div>
                    <div className="row">
                        <MyTextInput
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="jane@formik.com"
                        />
                    </div>
                    <div className="row">
                        <MySelect label="Job Type" name="jobType">
                            <option value="">Select a job type</option>
                            <option value="designer">Designer</option>
                            <option value="development">Developer</option>
                            <option value="product">Product Manager</option>
                            <option value="other">Other</option>
                        </MySelect>
                    </div>
                    <div className="row">
                        <MyCheckbox name="acceptedTerms">
                            I accept the terms and conditions
                        </MyCheckbox>
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    );
};