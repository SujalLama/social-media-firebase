import React from 'react'
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import {withRouter} from 'react-router-dom';

const RegisterScreen = ({history}) => {
    return (
        <div className='login'>
            <div className='form__login'>
                <h2 className="form__login--heading">
                Register new account
                </h2>
                <div className="form__login--content">
                    <Formik
                        initialValues={{ email: '', password: '', username: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                            errors.email = 'Required';
                            } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                            errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            }, 400);
                        }}
                        >
                        {({ isSubmitting }) => (
                            <Form className='form__login--form'>
                                <div className="form-group">
                                    <label>Username</label>
                                    <Field type="text" name="username" placeholder="username" className="input-field"/>
                                    <ErrorMessage name="username" component="div" className="error-msg" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field type="email" name="email" placeholder="email" className="input-field"/>
                                    <ErrorMessage name="email" component="div" className="error-msg" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <Field type="password" name="password" placeholder="password" className="input-field"/>
                                    <ErrorMessage name="password" component="div" className="error-msg"/>
                                </div>
                            <button className="btn btn__primary" type="submit" disabled={isSubmitting}>
                                Register
                            </button>
                            </Form>
                        )}
                        </Formik>
                </div>
                <div className='form__login--footer'>
                            <p>Already have an account?</p>
                            <button className='btn btn__text' onClick={() => history.push('/login')}>Login</button>
                </div>
            </div>
            <div className="login__banner">
                <img src="/images/login.jpg" alt="login page" />
            </div>
        </div>
    )
}

export default withRouter(RegisterScreen)