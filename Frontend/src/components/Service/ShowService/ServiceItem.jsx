import React from "react";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import Typography from "../../utility/Typography/Typography";

const ServiceItem = ({ service, onEdit, onDelete }) => {
  const checkStatus = (status) => {
    switch (status) {
      case "pending":
        return "text-gray-700";
      case "active":
        return "text-yellow-700";
      case "approved":
        return "text-info";
      case "completed":
        return "text-success";
      case "cancelled":
        return "text-error";
      default:
        return "";
    }
  };

  return (
    <tr className="flex flex-row items-start gap-x-2 lg:gap-x-4 w-full">
      <td className="border-b py-2 w-1/3 md:w-[15%] lg:w-[10%] text-left">
        <Typography variant="body1" weight="medium" color="primary">
          {service.title}
        </Typography>
      </td>
      <td className="border-b py-2 w-1/3 md:w-[15%] lg:w-[10%] text-left">
        <Typography
          variant="h4"
          weight="medium"
          className={`capitalize ${checkStatus(service.status)}`}
        >
          {service.status}
        </Typography>
      </td>
      <td className="border-b py-2 md:w-[50%] lg:w-[60%] hidden md:flex">
        <Typography variant="body1" weight="medium" color="primary"  className="pr-4 lg:pr-8 text-left ">
          {service.description}
        </Typography>
      </td>
      <td className="border-b py-2 w-1/3 md:w-[15%] text-left flex flex-row justify-center md:items-center gap-x-2">
        <button
          onClick={() => onEdit(service.id)}
          className="flex items-center bg-yellow-500 text-white px-1 md:px-2 py-1 rounded hover:bg-yellow-700"
        >
          <IoMdCreate className="md:mr-1 h-5 w-5 font-bold md:h-6 md:w-6" />
          <Typography
            variant="body2"
            weight="normal"
            color="white"
            className="hidden md:flex"
          >
            Edit
          </Typography>
        </button>
        <button
          onClick={() => onDelete(service.id)}
          className="flex items-center bg-red-700 text-white px-1 md:px-2 py-1 rounded hover:bg-red-200 hover:text-red-900 border-red-700"
        >
          <IoMdTrash className="md:mr-1" size={24} />
          <Typography
            variant="body2"
            weight="normal"
            color="white"
            className="hidden md:flex"
          >
            Delete
          </Typography>
        </button>
      </td>
    </tr>
  );
};

export default ServiceItem;