import { industries } from "./datas";
import { React, useEffect, useState } from "react";
import axiosClient from "../../../axiox-client";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  Select,
  Upload,
  Typography,
  message,
  Radio,
} from "antd";
export default function InternshipForm() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title, Text } = Typography;
  const { Group: CheckboxGroup } = Checkbox;
  const [datas, updateData] = useState([])

  // skill fetch
  useEffect(() => {
    axiosClient.get("./employ/skill_data").then((req) => {
      updateData(req.data.data)
    });
  },[]);

  const onFinish = (values) => {
    console.log("Data to be sent:", values); // Log the data
    axiosClient
      .post("./employ/inset_intn_form", JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json", // Ensure this is set correctly
        },
      })
      .then((req) => {
        if (req.data.success) console.log("Data uploaded successfully");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
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
    <div className="form-group mt-24 w-3/5">
      <h1 className="text-5xl font-bold">Internship details</h1>

      <Form
        form={form}
        className="mx-auto  backy"
        name="name_email_form"
        onFinish={onFinish}
        layout="vertical"
        style={{
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
          name="staff_skills"
          label="Skills required"
          rules={[
            { required: true, message: "Please select at least one industry" },
          ]}
        >
          <Select mode="multiple" placeholder="Select Skills">
            {datas.map((value) => (
              <Select.Option key={value.id} value={value.id}>
                {value.skill}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Internship Type"
          name="internship_Type"
          rules={[{ required: true, message: "Please enter Internship Type" }]}
        >
          <Radio.Group>
            <Radio className="text-gray-600 font-medium" value="0">
              In office
            </Radio>
            <Radio className="text-gray-600 font-medium" value="1">
              Hybrid
            </Radio>
            <Radio className="text-gray-600 font-medium" value="2">
              Remote
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Part-time/Full-time" name="job_timing">
          <Radio.Group>
            <Radio className="text-gray-600 font-medium" value="0">
              Part-time
            </Radio>
            <Radio className="text-gray-600 font-medium" value="1">
              Full-time
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="nm_openings"
          label="Number of openings"
          rules={[
            { required: true, message: "Please enter number of openings" },
          ]}
        >
          <Input placeholder="e.g. 50" type="number" />
        </Form.Item>

        <Form.Item label="Internship start date" name="intern_start">
          <Radio.Group>
            <Radio className="text-gray-600 font-medium" value="0">
              Immediately (within next 30 days)
            </Radio>
            <Radio className="text-gray-600 font-medium" value="1">
              Later
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={16}>
          {" "}
          {/* Add spacing between columns */}
          <Col span={16}>
            {" "}
            {/* Adjust column width */}
            <Form.Item
              name="intern_duration"
              label="Internship duration"
              rules={[{ required: true, message: "Please select" }]}
            >
              <Select placeholder="Select Industries">
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
                <Select.Option value="7">7</Select.Option>
                <Select.Option value="9">9</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            {" "}
            {/* Adjust column width */}
            <Form.Item
              name="industries2"
              label="Duration"
              rules={[{ required: true, message: "Please select" }]}
            >
              <Select placeholder="Select Industries">
                <Select.Option value="1"> Months</Select.Option>
                <Select.Option value="2">Weeks</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="int_respossibility_description"
          label="Intern’s responsibilities"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea
            rows={4} // You can set the number of visible rows
            maxLength={200}
          />
        </Form.Item>
        <Form.Item
          name="candidate_preference"
          label="Additional candidate preferences:"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea
            rows={4} // You can set the number of visible rows
            maxLength={200}
          />
        </Form.Item>

        <h1 className="font-bold text-4xl">Stipend & perks</h1>

        <Form.Item label="Stipend" name="Inten_duration">
          <Radio.Group>
            <Radio className="text-gray-600 font-medium" value="0">
              Fixed
            </Radio>
            <Radio className="text-gray-600 font-medium" value="1">
              Negotiable
            </Radio>
            <Radio className="text-gray-600 font-medium" value="2">
              Performance based
            </Radio>
            <Radio className="text-gray-600 font-medium" value="3">
              Unpaid
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="parks" label="Perks (Optional)">
          <CheckboxGroup>
            <Row gutter={16}>
              <Col span={12}>
                <Checkbox className="text-gray-600 font-medium" value="1">
                  Certificate
                </Checkbox>
                <Checkbox className="text-gray-600 font-medium" value="2">
                  Flexible work hours
                </Checkbox>
                <Checkbox className="text-gray-600 font-medium" value="3">
                  Informal dress code
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox className="text-gray-600 font-medium" value="4">
                  Letter of recommendation
                </Checkbox>
                <Checkbox className="text-gray-600 font-medium" value="5">
                  5 days a week
                </Checkbox>
                <Checkbox className="text-gray-600 font-medium" value="6">
                  Free snacks & beverages
                </Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>
        </Form.Item>

        <Form.Item></Form.Item>

        <h2 className="font-bold text-3xl">
          Alternate mobile number for this listing
        </h2>

        <Form.Item
          name="mobile"
          label="Mobile Number"
          rules={[
            {
              required: true,
              message: "Please input your mobile number!",
            },
            {
              pattern: /^\d{10}$/,
              message: "Mobile number must be 10 digits!",
            },
          ]}
        >
          <Input placeholder="Enter your mobile number" maxLength={10} />
        </Form.Item>

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
