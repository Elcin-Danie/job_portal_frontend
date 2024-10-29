import "../../../../assets/css/forms.css";
import { React, useState } from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  Upload,
  Typography,
  Select,
  message, // Import message for error notifications
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosClient from "../../../../axios-client";
import {
  faUserCircle,
  faBuilding,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons"; // Import the required icons

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select; // Import Option from Select
function onFinish (values) {
  console.log(values);
  
  try {
    axiosClient.post("employ/form_2", values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(req => {
      console.log(req);
      
    })

    // Handle successful response (e.g., navigate to another page or show a success message)
  } catch (error) {
    console.error("Error submitting form:", error);
    message.error("There was an error submitting the form. Please try again.");
  }
};
function Employ_form_2() {
  const [fileList, setFileList] = useState([]); // Initialize as an array

  const uploadProps = {
    beforeUpload: (file) => {
      const isValidFileType = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
      ].includes(file.type);
      const isValidFileSize = file.size / 1024 / 1024 < 1; // Size less than 1MB

      if (!isValidFileType) {
        message.error("You can only upload JPG/PNG/GIF/BMP files!");
        return false; // Prevent upload
      }

      if (!isValidFileSize) {
        message.error("Image must be smaller than 1MB!");
        return false; // Prevent upload
      }

      // Update the state with the selected file
      setFileList([file]); // Store as an array
      return false; // Prevent automatic upload
    },
    onChange: ({ fileList: newFileList }) => {
      // Handle the change of file list
      setFileList(newFileList);
    },
  };

  return (
    <>
      <div className="large-step-indicators mt-28">
        {/* Personal Details */}
        <x-icon
          style={{ color: "#00a5ec" }}
          className="completed text-cyan-500"
          id="personal_details_tab"
        >
          <FontAwesomeIcon className="text-7xl" icon={faUserCircle} />
        </x-icon>
        <x-text>Personal Details</x-text>

        {/* Organization Details */}
        <x-icon className="unlocked color" id="organization_details_tab">
          <FontAwesomeIcon className="text-4xl" icon={faBuilding} />
        </x-icon>
        <x-text>Organization Details</x-text>

        {/* Post Internship/Job */}
        <x-icon className="" id="internship__details_tab">
          <FontAwesomeIcon className="text-4xl" icon={faFileAlt} />
        </x-icon>
        <x-text>Post Internship/Job</x-text>
      </div>
      <section className="mt-12 ">
        <h1 className="text-center font-bold text-5xl">Organization details</h1>

        <div className=" _rem sm:w-auto mx-auto bg-white p-28 rounded-lg shadow-md">
          <Form layout="vertical" onFinish={onFinish}>
            {/* Organization Name */}
            <Form.Item
              name="company_name"
              label="Organization Name"
              rules={[
                { required: true, message: "Please enter organization name" },
              ]}
            >
              <Input placeholder="Organization Name" />
            </Form.Item>

            {/* Checkbox for Independent Practitioner */}
            <Form.Item>
              <Checkbox className="check-box" name="options_org_checkbox">
                I am an independent practitioner (freelancer, architect, lawyer,
                etc.) hiring for myself and I am NOT hiring on behalf of a
                company.
              </Checkbox>
            </Form.Item>

            {/* Organization Description */}
            <Form.Item
              name="company_description"
              label="Organization Description"
              rules={[
                {
                  required: true,
                  message: "Please enter organization description",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Enter organization description" />
            </Form.Item>

            {/* Organization City */}
            <Form.Item
              name="org_location"
              label="Organization City"
              rules={[
                { required: true, message: "Please enter organization city" },
              ]}
            >
              <Input placeholder="e.g. Mumbai" />
            </Form.Item>

            {/* Industry Multi-Select Dropdown */}
            <Form.Item
              name="industries"
              label="Industry"
              rules={[
                {
                  required: true,
                  message: "Please select at least one industry",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Select Industries">
                <Option value="technology">Technology</Option>
                <Option value="finance">Finance</Option>
                <Option value="healthcare">Healthcare</Option>
                <Option value="education">Education</Option>
                <Option value="construction">Construction</Option>
                <Option value="manufacturing">Manufacturing</Option>
                <Option value="retail">Retail</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            {/* No. of Employees */}
            <Form.Item
              name="employees_count"
              label="No. of Employees"
              rules={[
                { required: true, message: "Please enter number of employees" },
              ]}
            >
              <Input placeholder="e.g. 50" type="number" />
            </Form.Item>

            {/* Organization Logo Upload */}
            <Form.Item label="Organization Logo (Recommended)">
              <Upload {...uploadProps}>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Upload Logo
                </Button>
              </Upload>
              <Text className="text-2xl text-gray-500 mt-1">
                Max file size: 1Mb and max resolution: 500px x 500px. File type:
                jpeg, jpg, png, gif, bmp
              </Text>
            </Form.Item>

            {/* Verification Section */}
            <div className="mb-4">
              <Title level={4} className="text-center">
                Organization Verification
              </Title>
            </div>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-40 float-right bg-blue-600 hover:bg-blue-700"
              >
                Next
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
}

export default Employ_form_2;
