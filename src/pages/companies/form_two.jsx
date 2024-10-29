import React, { useState } from "react";
import "../../assets/css/forms.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBuilding,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import InternshipForm from "./organization_intern_job/Internship"
import Job from "./organization_intern_job/job"; // Make sure 'Job' is imported properly
import { Form, Radio } from "antd";

export default function Employ_form_two() {
  // State to handle which option is selected
  const [selectedOption, setSelectedOption] = useState('internship');
  

  return (
    <>
      <section>
        {/* Step Indicators */}
        <div className="large-step-indicators mt-28 mb-16">
          <x-icon
            style={{ color: "#00a5ec" }}
            className="completed text-cyan-500"
            id="personal_details_tab"
          >
            <FontAwesomeIcon className="text-7xl" icon={faUserCircle} />
          </x-icon>
          <x-text>Personal Details</x-text>
          <x-icon
            className="unlocked color colors bg-white"
            style={{ background: "#00a5ec" }}
            id="organization_details_tabs"
          >
            <FontAwesomeIcon className="text-4xl" icon={faBuilding} />
          </x-icon>
          <x-text>Organization Details</x-text>
          <x-icon id="internship__details_tab">
            <FontAwesomeIcon className="text-4xl" icon={faFileAlt} />
          </x-icon>
          <x-text>Post Internship/Job</x-text>
        </div>
      </section>

      {/* Radio Button Section */}
      <section className="flex justify-center items-center flex-col">
        <div
          style={{  borderRadius: "10px" }}
          className="pt-10 opportunity_type_section w-3/5 flex items-center flex-col backy"
        >
          <h4>Opportunity type</h4>
          <Form className="section internshala-form">
            <Form.Item name="opportunityType">
              <Radio.Group
                value={selectedOption} // Bind state to Radio Group
                onChange={(e) => setSelectedOption(e.target.value)} // Update state on change
              >
                <Radio value="internship">Internship</Radio>
                <Radio value="job">Job</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
      </section>

      {/* Conditional Rendering of Forms */}
      <section className="flex justify-center items-center flex-col">
        {selectedOption === "internship" ? <InternshipForm /> : <Job />}
      </section>
    </>
  );
}
