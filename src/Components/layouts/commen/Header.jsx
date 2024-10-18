import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Log_modal from "../../../pages/register/antd/login_modal";

export default function Commen_head() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("jobseeker"); // To toggle between forms

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSwitch = (formType) => {
    setActiveForm(formType);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="shadow-md w-full md:h-32 flex items-center">
      <div className="md:px-10 px-7 md:h-16 md:flex justify-between w-full">
        {/* Logo and burger icon */}
        <div className="flex text-3xl cursor-pointer items-center gap-8">
          <FontAwesomeIcon
            className="w-9 h-9 text-blue-600"
            icon={faBars}
            onClick={toggleSidebar} // Toggle sidebar on click
          />
          <div className="font-bold">Jobys</div>
        </div>
        
        <ul className="md:flex pl-9 md:pl-0">
          <div className="">
          <button onClick={openModal}
          style={{ border: '1px solid', }}
          className="rounded-md"
          >
          <Log_modal />
        </button>
          </div>
          <Link to="/registration/students">
            <button className="btn hover:text-gray-200  bg-blue-600 text-white bg-blue-600-gtext-gray-200 py-2 px-3 md:ml-8 rounded text-3xl font-bold">
              Candidate Sign-up
            </button>
          </Link>
          <Link to="/registration/hire">
            <button className="btn hover:text-gray-200  bg-blue-600 text-white bg-blue-600-gtext-gray-200 py-2 px-3 md:ml-8 rounded text-3xl font-bold">
              Employer Sign-up
            </button>
          </Link>
        </ul>
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "250px", transition: "transform 0.3s ease" }} // Adjust the width and transition duration
      >
        <div className="p-4">
          <h2 className="text-lg font-bold">Menu</h2>
          <ul>
            <li className="py-2">
              <Link to="/">Home</Link>
            </li>
            <li className="py-2">
              <Link to="/about">About</Link>
            </li>
            <li className="py-2">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <button
            onClick={toggleSidebar}
            className="mt-4 p-2 bg-blue-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40" // Black transparent background
          onClick={toggleSidebar} // Close sidebar when clicked
        />
      )}
    </div>
  );
}
