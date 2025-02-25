import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Card, Row } from "react-bootstrap";
import NewStudentFormError from '../Enrollment/Common/NewStudentFormError';
import StudentParamCheck from '../Enrollment/Common/StudentParamCheck';
import UserHeaderUI from '~/components/Enrollment/UserHeaderUI.jsx';

function NewStudentForm(props) {
  const csrf_token = document.head.getElementsByTagName('meta')[2].content;
  const enrollment_id = document.getElementById("data").getAttribute("enrollmentID");
  const errors = JSON.parse(document.getElementById("data").getAttribute("errors"));
  const studentParams = JSON.parse(document.getElementById("data").getAttribute("student_params"));
  const [firstName, setFirstName] = useState(StudentParamCheck(studentParams, "first_name") || "");
  const [lastName, setLastName] = useState(StudentParamCheck(studentParams, "last_name") || "");
  const [email, setEmail] = useState(StudentParamCheck(studentParams, "email") || "");
  const [phone, setPhone] = useState(StudentParamCheck(studentParams, "phone")|| "");
  const [language, setLanguage] = useState(StudentParamCheck(studentParams, "language") || "");

  const uri = `${props.slash}${props.admin}/enrollments/${enrollment_id}/students`;

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>{UserHeaderUI(props.admin)}
    <Row style={{ height: "95vh" }}>
      {NewStudentFormError(errors)}
      <Card className="card mx-auto my-auto" style={{ width: "60%" }}>
        <Card.Title className="text-center" style={{ marginTop: "25px", marginBottom: "20px" }}>
          Please fill out the form below:
        </Card.Title>
        <Form action={uri} method="post">
          <input type="hidden" name="authenticity_token" value={csrf_token} />
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control type="text" placeholder="Please Enter First Name" name="first_name" maxLength="100" value={firstName} onChange={handleFirstNameChange} />
          </Form.Group>
          <br />
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" placeholder="Please Enter Last Name" name="last_name" maxLength="100" value={lastName} onChange={handleLastNameChange} />
          </Form.Group>
          <br />
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" placeholder="Please Enter Email" name="email" value={email} maxLength="100" onChange={handleEmailChange} />
          </Form.Group>
          <br />
          <Form.Group controlId="formPhone">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="text" placeholder="Please Enter Phone Number" name="phone" value={phone} onChange={handlePhoneChange} />
          </Form.Group>
          <br />
          <Form.Group controlId="formLanguage">
            <Form.Label>What language(s) do you speak?</Form.Label>
            <Form.Control type="text" placeholder="Please Enter Language(s)" name="language" maxLength="100" value={language} onChange={handleLanguageChange} />
          </Form.Group>
          <div className="text-center">
            <Button size="sm" variant="outline-primary" style={{ margin: "25px" }} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Row>
    </div>
  );
}

export default NewStudentForm;