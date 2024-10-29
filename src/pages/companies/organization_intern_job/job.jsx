import { react, useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Upload,
  Typography,
  message,
  Radio,
  Col,
  Row,
  Space,
} from "antd";
import axiosClient from "../../../axiox-client";
import { industries } from "./datas";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

export default function Job() {
  const navigate = useNavigate(); 
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title, Text } = Typography;
  const { Group: CheckboxGroup } = Checkbox;
  const [questions, setQuestions] = useState([]);
  const [datas, updateData] = useState([]);


// dropdown axios======
  useEffect(() => {
    axiosClient.get("./employ/skill_data").then((req) => {
      updateData(req.data.data)
    });
  },[]);

  // multitipe input
  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1 }]);
  };
  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const onFinish = (values) => {
    const data = JSON.stringify(values);
    console.log(data);
    
    axiosClient.post("employ/job_posts", data, {
        headers: {
          'Content-Type': "application/json", // Specify that you expect a JSON response
        },
      })
      .then((req) => {
        console.log(req.data.success);
        
        if (req.data.success) return navigate("../../companie/dashboard");
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
      <h1 className="text-5xl font-bold">Job details</h1>

      <Form
        form={form}
        className="mx-auto backy"
        name="name_email_form"
        onFinish={onFinish}
        layout="vertical"
        style={{
          borderRadius: "5px",
          padding: "50px",
        }}
      >
        <Form.Item
          name="job_title"
          label="Job title"
          rules={[
            { required: true, message: "Please enter organization name" },
          ]}
        >
          <Input placeholder="Developer" />
        </Form.Item>

        <Form.Item label="Experience">
          <Form.Item
            name="min_experience"
            label="Minimum Experience"
            rules={[
              { required: true, message: "Please select minimum experience" },
            ]}
            noStyle
          >
            <Select placeholder="Min" style={{ width: "40%" }}>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
              <Select.Option value="4">4</Select.Option>
            </Select>
          </Form.Item>
          <span className="mx-2">To</span>
          <Form.Item
            name="max_experience"
            label="Maximum Experience"
            rules={[
              { required: true, message: "Please select maximum experience" },
            ]}
            noStyle
          >
            <Select placeholder="Max" style={{ width: "40%" }}>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3*</Select.Option>
              <Select.Option value="4*">4</Select.Option>
              <Select.Option value="5*">5</Select.Option>
            </Select>
          </Form.Item>
          <span className="mx-3"> year(s)</span>
        </Form.Item>

        <Form.Item
          name="skills"
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
          name="internshipType"
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

        <Form.Item label="Part-time/Full-time" name="timing">
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

        <Form.Item
          name="description"
          label="Job description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea
            rows={4} // You can set the number of visible rows
            placeholder="Selected intern's day-to-day responsibilities include:"
            maxLength={200}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Additional candidate preferences:"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea
            rows={4} // You can set the number of visible rows
            placeholder="Selected intern's day-to-day responsibilities include:"
            maxLength={200}
          />
        </Form.Item>

        <Form.Item label="Input Section">
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item
                name="dropdown"
                rules={[{ required: true, message: "Please select anoption" }]}
                noStyle
              >
                <Select placeholder="₹">
                  <Select.Option value="1">₹</Select.Option>
                  <Select.Option value="2">$</Select.Option>
                  <Select.Option value="3">€</Select.Option>
                  <Select.Option value="4">£</Select.Option>
                  <Select.Option value="5">CHF</Select.Option>
                  <Select.Option value="6">SGD</Select.Option>
                  <Select.Option value="7">Yen</Select.Option>
                  <Select.Option value="8">NIS</Select.Option>
                  <Select.Option value="9">¥</Select.Option>
                  <Select.Option value="10">AED</Select.Option>
                  <Select.Option value="11">LKR</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={10}>
              <Form.Item
                name="salary_field1"
                rules={[{ required: true, message: "Please enter a number" }]}
                noStyle
              >
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={10}>
              <Form.Item
                name="salary_field2"
                rules={[{ required: true, message: "Please enter a number" }]}
                noStyle
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="industries"
          label="Perks (Optional)"
          rules={[{ required: true, message: "Please select any one" }]}
        >
          <CheckboxGroup>
            <Row gutter={16}>
              <Col span={12}>
                <Checkbox className="text-gray-600 font-medium" value="1">
                  5 days a week
                </Checkbox>
                <Checkbox className="text-gray-600 font-medium" value="2">
                  Life Insurance
                </Checkbox>
              </Col>
              <Col span={12}>
                <Checkbox className="text-gray-600 font-medium" value="4">
                  Health Insurance
                </Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>
        </Form.Item>
        {/* =================================== */}

        <Form.Item>
          <Text strong className="coverLetter">
            Cover letter & availability questions will be asked to every
            applicant by default. If you wish, you may ask two more customized
            questions as an assessment.
          </Text>
        </Form.Item>

        <Form.Item label="Cover Letter">
          <Text className="coverLetter">
            Why should you be hired for this role?
          </Text>
        </Form.Item>

        <Form.Item label="Availability">
          <Text className="coverLetter">
            Are you available for a full-time remote job starting immediately?
            If not, what is the earliest date you can start this job?
          </Text>
        </Form.Item>

        {/* Dynamic Assessment Questions */}
        {questions.map((question, index) => (
          <Space
            key={question.id}
            className="multi_choos "
            style={{
              display: "flex",
              width: "100%",
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            <Form.Item
              label={`Assessment Question ${index + 1}`}
              style={{ flex: 1, marginBottom: 0, width: "100%" }}
            >
              <TextArea
                style={{ width: "100%" }}
                rows={4}
                placeholder={`Type your question here`}
              />
            </Form.Item>
            <Button
              icon={<MinusCircleOutlined />}
              type="text"
              onClick={() => handleRemoveQuestion(question.id)}
              danger
            />
          </Space>
        ))}

        {questions.length < 2 && (
          <Form.Item>
            <Button
              type="dashed"
              onClick={handleAddQuestion}
              icon={<PlusOutlined />}
            >
              Add Assessment Question
            </Button>
          </Form.Item>
        )}

        {/* Additional Checkbox for Communication Skills */}
        <Form.Item>
          <Checkbox>
            Evaluate communication skills of the candidates via AI interview
          </Checkbox>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            (BETA)
          </Text>
        </Form.Item>

        {/* ======================================= */}
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
