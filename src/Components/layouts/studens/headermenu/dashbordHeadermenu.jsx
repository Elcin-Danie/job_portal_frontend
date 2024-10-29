import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const DropdownMenu = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <ul className="md:flex pl-9 md:pl-0 m-0 w-1/2 justify-evenly">
      {/* Internship Mega Menu */}
      <li 
        className="relative" 
        onMouseEnter={() => handleMouseEnter('internship')} 
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center">
          Internship 
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`ml-2 transition-transform duration-200 ${hoveredItem === 'internship' ? 'transform rotate-180' : ''}`} 
          />
        </button>
        {hoveredItem === 'internship' && (
          <div className="absolute left-0 w-auto bg-white shadow-md z-10 p-4">
            <div className="flex justify-around">
              <div className="p-2 border border-gray-200">
                <h3 className="font-bold">Internship Category 1</h3>
                <p>Option 1 Description</p>
                <p>Option 2 Description</p>
              </div>
              <div className="p-2 border border-gray-200">
                <h3 className="font-bold">Internship Category 2</h3>
                <p>Option 1 Description</p>
                <p>Option 2 Description</p>
              </div>
            </div>
          </div>
        )}
      </li>

      {/* Courses Mega Menu */}
      <li 
        className="relative" 
        onMouseEnter={() => handleMouseEnter('courses')} 
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center">
          Courses 
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`ml-2 transition-transform duration-200 ${hoveredItem === 'courses' ? 'transform rotate-180' : ''}`} 
          />
        </button>
        {hoveredItem === 'courses' && (
          <div className="absolute left-0 w-auto bg-white shadow-md z-10 p-4">
            <div className="flex justify-around">
              <div className="p-2 border border-gray-200">
                <h3 className="font-bold">Course Category 1</h3>
                <p>Option 1 Description</p>
                <p>Option 2 Description</p>
              </div>
              <div className="p-2 border border-gray-200">
                <h3 className="font-bold">Course Category 2</h3>
                <p>Option 1 Description</p>
                <p>Option 2 Description</p>
              </div>
            </div>
          </div>
        )}
      </li>

      {/* Jobs Mega Menu */}
      <li 
        className="relative" 
        onMouseEnter={() => handleMouseEnter('jobs')} 
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center">
          Jobs 
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`ml-2 transition-transform duration-200 ${hoveredItem === 'jobs' ? 'transform rotate-180' : ''}`} 
          />
        </button>
        {hoveredItem === 'jobs' && (
          <div className="absolute left-0 w-auto bg-white shadow-md z-10 p-4">
            <div className="flex justify-around">
              <div className="p-2 border border-gray-200">
                <h3 className="font-bold">Job Category 1</h3>
                <p>Option 1 Description</p>
                <p>Option 2 Description</p>
              </div>
              <div className="p-2 border border-gray-200">
                <h3 className="font-bold">Job Category 2</h3>
                <p>Option 1 Description</p>
                <p>Option 2 Description</p>
              </div>
            </div>
          </div>
        )}
      </li>
    </ul>
  );
};



export default DropdownMenu;
