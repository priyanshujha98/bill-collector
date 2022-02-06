import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import actions from "../../store/actions/actions";
import Loader from "../Common/Loader";

export const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.network?.isLoading);
  const formInitialValue = {
    email: "",
    password: "",
  };

  useEffect(()=>{
    dispatch(actions.resetCodeVerification())
  },[])

  const formSchema = yup.object().shape({
    username: yup.string().required("Please Enter a Vaild Username"),
    password: yup.string().required("Please Enter Password"),
  });
  return (
    <React.Fragment>
      <Formik
        initialValues={formInitialValue}
        validationSchema={formSchema}
        onSubmit={(values) => {
          dispatch(actions.login(values));
        }}
      >
        {({
          handleChange,
          errors,
          values,
          touched,
          setFieldValue,
          submitForm,
        }) => (
          <Form>
            <Row className="loginFullScreen">
              
              <Col className="alignCenterSelf marginAuto">
                <Row className="loginInput">
                  <Col className="loginInputCenter">
                    <Form.Group>
                      <Form.Label>
                        <h1>Login </h1>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        className="br-20 inputBorder"
                        placeholder="Username"
                        onChange={handleChange}
                        isInvalid={touched?.username && errors?.username}
                      ></Form.Control>
                      {touched?.username && errors?.username && (
                        <span className="formError">
                          <i>{errors?.username}</i>
                        </span>
                      )}
                    </Form.Group>
                  </Col>
                </Row >
                <Row className="mt-3 loginInput">
                  <Col className="loginInputCenter">
                    <Form.Group>
                      <Form.Control
                        type="password"
                        name="password"
                        className="br-20 inputBorder"
                        placeholder="Password"
                        onChange={handleChange}
                        isInvalid={touched?.password && errors?.password}
                      ></Form.Control>
                      {touched?.password && errors?.password && (
                        <span className="formError">
                          <i>{errors?.password}</i>
                        </span>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="loginInput p-3 pb-0">
                  <Col className="loginInputCenter">
                      <Link to="/forgot-password" className="forgotPass">
                        Forgot your password?
                      </Link>
                  </Col>
                </Row >
                <Row className="loginInput p-3 pt-0 pb-0">
                    <Col className="loginInputCenter">
                      <Link to="/sign-up" className="forgotPass">
                        Sign Up ?
                      </Link>
                    </Col>
                </Row>

                
                  <Row className="loginInput mt-3">
                    <Col className="loginInputCenter alignCenterText">
                {!isLoading ? (
                      <Button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault()
                          submitForm();
                        }}
                        className={"br-20 loginSubmitButton"}
                      >
                        Submit
                      </Button>
                      
                      ) : (
                          <Row className="mt-3 mb-0">
                              <Loader />
                          </Row>
                      )}
                    </Col>
                  </Row>
              </Col>
              </Row>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
