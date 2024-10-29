import React from "react";
import { Link,useNavigate  } from "react-router-dom";
import { Form, Input, Button } from "antd";
// import "../register/antd/dist/reset.css";
import Log_modal from "../register/antd/login_modal";
import axiosClient from "../../axiox-client";

const C_P_R_F = () => {
  const navigate = useNavigate(); // Hook for navigation
  const onFinish = (values) => {
      axiosClient.post("employ/singup", values)
      .then((req) => { 
           

        if(req.data.success === true){
          // navigate('../register_1');
        } 
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="registration"
        className="space-y-6"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* First Name and Last Name in Same Row */}
        <div className="flex space-x-4">
          <div className="flex-1 mb-2">
            <label
              htmlFor="first_name"
              className="block text-2xl font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please enter your first name!" },
              ]}
            >
              <Input
                placeholder="First Name"
                id="first_name"
                name="first_name"
                className="py-3 text-2xl"
              />
            </Form.Item>
          </div>

          <div className="flex-1 mb-2">
            <label
              htmlFor="last_name"
              className="block text-2xl font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please enter your last name!" },
              ]}
            >
              <Input
                placeholder="Last Name"
                id="last_name"
                name="last_name"
                className="py-3 text-2xl"
              />
            </Form.Item>
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-2xl font-medium leading-6 text-gray-900"
          >
            Official Email Id
          </label>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              autoComplete="email"
              className="py-3 text-2xl"
            />
          </Form.Item>
        </div>

        {/* Mobile Number Field */}
        <div className="mb-2">
          <label
            htmlFor="mobileNumber"
            className="block text-2xl font-medium leading-6 text-gray-900"
          >
            Mobile Number
          </label>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please enter your mobile number!" },
            ]}
          >
            <Input
              type="tel"
              placeholder="Enter your mobile number"
              maxLength={10}
              className="py-3 text-2xl"
            />
          </Form.Item>
        </div>

        {/* Password Field */}
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-2xl font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Minimum 6 characters"
              id="password"
              name="password"
              autoComplete="current-password"
              className="py-3 text-2xl"
            />
          </Form.Item>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button
            style={{ background: "#457d99" }}
            type="primary"
            htmlType="submit"
            className="flex w-full justify-center rounded-md bg-[#457d99] px-3 my-3 text-2xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </Button>
        </Form.Item>

        {/* Login Link */}
      </Form>

      <div className="flex justify-center items-center gap-3">
        Already have an account?
        <Log_modal />
      </div>
    </>
  );
};

export default C_P_R_F;
