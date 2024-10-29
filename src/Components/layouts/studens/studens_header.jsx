import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faMessage } from "@fortawesome/free-solid-svg-icons";
import Log_modal from "../../../pages/register/antd/login_modal";
import DropdownMenu from "./headermenu/dashbordHeadermenu";

export default function Studens_header() {
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
        <div className="menus flex w-1/2 justify-evenly items-center">
          <DropdownMenu />
          <ul className="flex w-1/4 justify-around m-0">
            <Link>
              <li>
              <FontAwesomeIcon icon={faBell} className="text-4xl"/>
              </li>
            </Link>
            <Link>
              <li>
              <FontAwesomeIcon icon={faMessage} className="text-4xl"/>
              </li>
            </Link>
            <Link>
              <li></li>
            </Link>
          </ul>
        </div>
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
