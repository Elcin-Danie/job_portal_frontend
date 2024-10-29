import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Upload,
  Typography,
  message,
} from "antd";
import axiosClient from "../../axiox-client";
import "../../assets/css/forms.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBuilding,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

function Employ_form() {
  const [fileList, setFileList] = useState([]); // Initialize as an array
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Hook for navigation

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("company_name", values.company_name);
    formData.append("company_description", values.company_description);
    formData.append("org_location", values.org_location);
    formData.append("industries", values.industries.join(","));
    formData.append("employees_count", values.employees_count);

    // Append file if available
    if (fileList.length > 0) {
      formData.append("logo", fileList[0].originFileObj); // Append the file
    }

    axiosClient
      .post("employ/form_2", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((req) => {
        if (req.data.success) return navigate("../rgs_2");
      });
  };

  // upload Props
  const uploadProps = {
    beforeUpload: (file) => {
      // Check the file type
      const isValidFileType = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
      ].includes(file.type);

      // Check file size (less than 1MB)
      const isValidFileSize = file.size / 1024 / 1024 < 1;

      if (!isValidFileType) {
        message.error("You can only upload JPG/PNG/GIF/BMP files!");
        return false; // Prevent upload
      }

      if (!isValidFileSize) {
        message.error("Image must be smaller than 1MB!");
        return false; // Prevent upload
      }

      // Update the fileList if validation passes
      setFileList([file]); // Only store the valid file
      return false; // Prevent automatic upload
    },
    onChange: ({ file, fileList: newFileList }) => {
      // If the file is invalid, remove it from the list
      const isValidFileType = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
      ].includes(file.type);
      const isValidFileSize = file.size / 1024 / 1024 < 1;

      if (!isValidFileType || !isValidFileSize) {
        // Filter out the invalid file
        message.error("You can only upload JPG/PNG/GIF/BMP files!");
        setFileList(newFileList.filter((item) => item.uid !== file.uid));
      } else {
        // Update the state with the new file list
        setFileList(newFileList);
      }
    },
  };

  return (
    <div>
      <div className="large-step-indicators mt-28 mb-16">
        <x-icon
          style={{ color: "#00a5ec" }}
          className="completed text-cyan-500"
          id="personal_details_tab"
        >
          <FontAwesomeIcon className="text-7xl" icon={faUserCircle} />
        </x-icon>
        <x-text>Personal Details</x-text>
        <x-icon className="unlocked color" id="organization_details_tab">
          <FontAwesomeIcon className="text-4xl" icon={faBuilding} />
        </x-icon>
        <x-text>Organization Details</x-text>
        <x-icon id="internship__details_tab">
          <FontAwesomeIcon className="text-4xl" icon={faFileAlt} />
        </x-icon>
        <x-text>Post Internship/Job</x-text>
      </div>

      <div className="title my-18">
        <h1 className="text-6xl font-bold text-center">Organization details</h1>
      </div>

      <Form
        form={form}
        className="mx-auto mt-24"
        name="name_email_form"
        onFinish={onFinish}
        layout="vertical"
        style={{
          maxWidth: "60%",
          border: "1px solid #b9b7b7",
          borderRadius: "5px",
          padding: "50px",
        }}
      >
        <Form.Item
          name="company_name"
          label="Organization Name"
          rules={[
            { required: true, message: "Please enter organization name" },
          ]}
        >
          <Input placeholder="Organization Name" />
        </Form.Item>

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

        <Form.Item
          name="org_location"
          label="Organization City"
          rules={[
            { required: true, message: "Please enter organization city" },
          ]}
        >
          <Input placeholder="e.g. Mumbai" />
        </Form.Item>

        <Form.Item
          name="industries"
          label="Industry"
          rules={[
            { required: true, message: "Please select at least one industry" },
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

        <Form.Item
          name="employees_count"
          label="No. of Employees"
          rules={[
            { required: true, message: "Please enter number of employees" },
          ]}
        >
          <Input placeholder="e.g. 50" type="number" />
        </Form.Item>

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

        <div className="mb-4">
          <Title level={4} className="text-center">
            Organization Verification
          </Title>
        </div>

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
  );
}

export default Employ_form;
