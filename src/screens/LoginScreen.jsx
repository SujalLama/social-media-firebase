import React from 'react'
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import {withRouter} from 'react-router-dom';

const LoginScreen = ({history}) => {
    return (
        <div className='login'>
            <div className="login__banner">
                <img src="/images/register.jpg" alt="login page" />
            </div>
            <div className='form__login'>
                <h2 className="form__login--heading">
                Login to your account.
                </h2>
                <div className="form__login--content">
                    <Formik
                        initialValues={{ email: '', password: '' }}
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
                                Login
                            </button>
                            </Form>
                        )}
                        </Formik>
                </div>
                <div className='form__login--footer'>
                            <p>Don't have account yet?</p>
                            <button className='btn btn__text' onClick={() => history.push('/register')}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginScreen)
