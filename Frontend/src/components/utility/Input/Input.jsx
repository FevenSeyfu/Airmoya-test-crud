import React from "react";
import PropTypes from "prop-types";
import { FaCheckCircle, FaStarOfLife } from "react-icons/fa";
import Typography from "../Typography/Typography";

const InputField = ({
  placeholder,
  size = "regular",
  label,
  name,
  type = "text",
  helperMessage,
  state = "default",
  isRequired = false,
  value,
  onChange,
  onBlur,
}) => {
  const sizeClass = size === "large" ? "h-16" : "h-12";
  const stateClasses = {
    default: "border-dark-blue focus:outline-dark-blue focus:outline-2",
    active: "border-info focus:outline-info focus:outline-2",
    filled: "border-dark-blue bg-info-light focus:outline-neutral-text focus:outline-2",
    success: "border-success focus:outline-success focus:outline-2",
    error: "border-error focus:outline-error focus:outline-2",
    disabled: "border-neutral-text bg-neutral-bg",
  };

  const stateClass = stateClasses[state] || stateClasses.default;

  return (
    <div className="flex flex-col justify-start items-start w-full">
      {label && (
        <div className="relative mb-2">
          <Typography
            variant="h4"
            weight="medium"
            color="secondary"
            className="inline-block"
          >
            {label}
          </Typography>
          {isRequired && (
            <FaStarOfLife
              size={5}
              color="red"
              className="absolute bottom-[12px] -right-2"
            />
          )}
        </div>
      )}
      <div
        className={`relative flex items-center border rounded-xl ${stateClass} ${sizeClass} w-full`}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={state !== "disabled" ? onChange : undefined}
          onBlur={onBlur}
          readOnly={state === "disabled"}
          className={`w-full text-base py-1 pl-4 flex outline-none bg-inherit text-inherit ${
            state === "filled" ? "bg-info-light" : ""
          } ${
            state === "disabled" && "hover:cursor-not-allowed"
          }`}
          autoComplete="off"
        />
        {state === "success" && (
          <FaCheckCircle size={20} className="absolute right-2 text-success" />
        )}
      </div>
      {helperMessage && (
        <span
          className={`text-base font-regular mt-1 ${
            state === "success"
              ? "text-success"
              : state === "error"
              ? "text-error"
              : "text-neutral-text"
          }`}
        >
          {helperMessage}
        </span>
      )}
    </div>
  );
};

InputField.propTypes = {
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["regular", "large"]),
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  helperMessage: PropTypes.string,
  state: PropTypes.oneOf([
    "default",
    "active",
    "filled",
    "success",
    "error",
    "disabled",
  ]),
  isRequired: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default InputField;