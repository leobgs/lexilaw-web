import React, { useState } from "react";
import clsx from "clsx";
import images from "assets/images";

export const Dropdown = ({
  className,
  disabled,
  placeholder,
  options,
  selectedOption,
  onSelectedOption
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelectedOption(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left z-30">
      <button
        className={clsx(
          "flex items-center justify-between w-full h-[3rem] py-3 px-4 rounded-[100px] font-semi-bold text-base bg-primary-light ring-gray-100 ring-1 transition duration-150 ease-in-out",
          className,
          disabled ? "disabled" : ""
        )}
        onClick={toggleDropdown}
        disabled={disabled}
      >
        {selectedOption || placeholder}
        <img
          src={images.ic_chevron_down}
          alt="chevron_down"
          className={clsx("size-6 transition-transform", isOpen ? "rotate-180" : "")}
        />
      </button>

      {isOpen && (
        <div className="origin-top-center absolute right-0 mt-2 w-full rounded-md shadow-lg bg-primary-light ring-1 ring-gray-100 ring-opacity-5 overflow-hidden max-h-64">
          <div className="px-3 py-2 bg-white border-b border-gray-100">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 border text-sm border-gray-100/50 rounded-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="overflow-y-auto max-h-64">
            <div className="py-1 divide-y divide-gray-100/50" role="none">
              {filteredOptions.map((option, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
