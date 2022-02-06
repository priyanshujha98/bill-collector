import { Formik } from "formik";
import * as moment from 'moment';
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup";
import actions from "../../store/actions/actions";
import Loader from "../Common/Loader";
export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.network?.isLoading);
  const codeVerification = useSelector((state) =>state?.login?.codeVerified)
  const formInitialValue = {
    username: "",
    newPassword: "",
    dob: ""
  };
  const history = useHistory()

  useEffect(()=>{
    if(codeVerification){
        history.push("/login")
    }
  },[codeVerification])

  const formSchema = yup.object().shape({
    username: yup.string().required("Please Enter a Vaild username"),
    dob: yup.date().required("Please Enter Date of birth"),
    newPassword: yup
    .string()
    .min(7, "Minimum 7 characters")
  });
  return (
    <React.Fragment>
      <Formik
        initialValues={formInitialValue}
        validationSchema={formSchema}
        onSubmit={(values) => {
            const payload = {
                "username":values?.username,
                "dob": `${moment(new Date(values?.dob), 'DD-MM-YYYY').date()}-${moment(new Date(values?.dob), 'DD-MM-YYYY').month()+1}-${moment(new Date(values?.dob), 'DD-MM-YYYY').year()}`,
                "newPassword": values?.newPassword
            }
          dispatch(actions.codeVerification(payload));
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
            <Row  className="loginFullScreen">
              <Col className="alignCenterSelf marginAuto">
                <Row className="loginInput">
                  <Col  className="loginInputCenter">
                    <Form.Group>
                      <Form.Label>
                        <h3> Forgot Password ? </h3>
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
                </Row>
                
                    <React.Fragment>
                        <Row className="mt-3 loginInput">
                        <Col  className="loginInputCenter">
                            <Form.Group>
                            <Form.Control
                                type="date"
                                name="dob"
                                className="br-20 inputBorder"
                                placeholder="Date of bith"
                                onChange={handleChange}
                                isInvalid={touched?.dob && errors?.dob}
                            ></Form.Control>
                            {touched?.dob && errors?.dob && (
                                <span className="formError">
                                <i>{errors?.dob}</i>
                                </span>
                            )}
                            </Form.Group>
                        </Col>
                        </Row>
                        <Row className="mt-3 loginInput">
                        <Col className="loginInputCenter">
                            <Form.Group>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                className="br-20 inputBorder"
                                placeholder="Please enter the new password"
                                onChange={handleChange}
                                isInvalid={touched?.newPassword && errors?.newPassword}
                            ></Form.Control>
                            {touched?.newPassword && errors?.newPassword && (
                                <span className="formError">
                                <i>{errors?.newPassword}</i>
                                </span>
                            )}
                            </Form.Group>
                        </Col>
                        </Row>
                    </React.Fragment>

                
                  <Row className="loginInput mt-3">
                    <Col  className="loginInputCenter">
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
                  <Row  className="mt-3 loginInput">
                    <Col  className="loginInputCenter" >
                        <Button
                            className="br-20 cancelButton"
                            variant="secondary"
                            
                            onClick={()=>{
                                history.push("/login")
                            }}
                        >
                            Cancel
                        </Button>
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
