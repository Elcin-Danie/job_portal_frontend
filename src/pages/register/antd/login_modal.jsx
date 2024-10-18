import React, { useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import { Modal, Button, Form, Input } from "antd";
import axiosClient from "../../../axiox-client";
// import setCookie from "../../../setCookies";
import Cookies from 'js-cookie';

const Log_modal = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("jobseeker");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSwitch = (formType) => {
    setActiveForm(formType);
  };

  
  // Handle form submission for Jobseeker
  const handleJobseekerSubmit = (values) => {
    axiosClient.post("users/login", values).then((res) => {
      if(decodeToken(res.data.token)){
        // setcookie(res.data.token)
        navigate('../../studens/dashboard');
      } 

    });
    closeModal();
  };

  // Handle form submission for Company
  const handleCompanySubmit = (values) => {
    axiosClient.post('employ/singin', values)
    .then(req => {
      if(decodeToken(req.data.token)){
        // setcookie(res.data.token)
        navigate('../../studens/dashboard');
      }
    })
    closeModal();
  };
  // decode token
  function decodeToken(token) {
    try {
      const base64Url = token.split(".")[1]; // Get payload part of JWT
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedData = JSON.parse(window.atob(base64));
       Cookies.set('_auth_token',token,{ expires: 1 })
       return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return null; // Return null in case of an error
    }
  }
  

  return (
    <div className="App">
      {/* Ant Design Button */}
      <Button onClick={openModal}>Log in</Button>

      {isModalOpen && (
        <Modal
          title={
            <div className="text-center text-4xl mb-7 text-blue-600 ">
              Log in
            </div>
          }
          visible={isModalOpen}
          onCancel={closeModal}
          footer={null} // No footer to match original functionality
        >
          {/* Buttons to switch between forms */}
          <div className="flex justify-around mb-6">
            <Button
              type={activeForm === "jobseeker" ? "primary" : "default"}
              onClick={() => handleFormSwitch("jobseeker")}
            >
              Student
            </Button>

            <Button
              type={activeForm === "company" ? "primary" : "default"}
              onClick={() => handleFormSwitch("company")}
            >
              Employer
            </Button>
          </div>

          {/* Jobseeker Form */}
          {activeForm === "jobseeker" && (
            <>
              <h1 className="text-3xl font-semibold text-center my-4">
                Student Login
              </h1>
              <Form
                layout="vertical"
                onFinish={handleJobseekerSubmit} // Handles Jobseeker form submission
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <div className="flex flex-col">
                  <Link className="text-justify">Forgot password?</Link>
                  {/* Ant Design Button */}
                  <Button type="primary" htmlType="submit" block>
                    Log in
                  </Button>
                </div>
              </Form>
            </>
          )}

          {/* Company Form */}
          {activeForm === "company" && (
            <>
              <h2 className="text-3xl font-semibold text-center my-4">
                Employer Login
              </h2>
              <Form
                layout="vertical"
                onFinish={handleCompanySubmit} // Handles Company form submission
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <div className="flex flex-col">
                  <Link className="text-justify">Forgot password?</Link>
                  {/* Ant Design Button */}
                  <Button type="primary" htmlType="submit" block>
                    Log in
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Log_modal;
