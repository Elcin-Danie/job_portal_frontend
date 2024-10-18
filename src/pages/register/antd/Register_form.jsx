import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import axiosClient from "../../../axiox-client";

const RegistrationForm = () => {
  const onFinish = async (values) => {
    try {
      // Send data to your backend server


      axiosClient.post('/users/register',values)

      // axios.get('http://localhost:3000/api/register',values)
      .then(response => console.log(response.data))
      .catch(error => console.error('Error:', error));



      // const response = await axios.post(
      //   "http://localhost:3000/api/register",
      //   values
      // );
      // console.log("Success:", response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error("There was an error sending the data:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      <Form
        name="registration"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* First Name and Last Name in Same Row */}
        <div className="flex space-x-4 mb-4">
          <Form.Item
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            className="flex-1"
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            className="flex-1"
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </div>

        {/* Email Field */}
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#457d99] text-white"
          >
            Submit
          </Button>
        </Form.Item>

        {/* Login Link */}
        <div className="flex justify-center items-center gap-3 mt-4">
          Already have an account?
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Log in
          </a>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationForm;
