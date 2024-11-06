import React from 'react';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';

const ServiceItem = ({ service, onEdit, onDelete }) => {
  return (
    <tr className='flex flex-row items-start w-full'>
      <td className="border-b py-2 w-[10%] text-left ">{service.title}</td>
      <td className="border-b py-2 w-[10%] text-left">{service.status}</td>
      <td className="border-b py-2 w-[65%] text-left pr-8">{service.description}</td>
      <td className="border-b py-2 w-[15%] text-left flex flex-row items-center gap-x-2">
      <button
          onClick={() => onEdit(service.id)}
          className="flex items-center bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
        >
          <IoMdCreate className="mr-1" /> Edit
        </button>
        <button
          onClick={() => onDelete(service.id)}
          className="flex items-center bg-red-700 text-white px-2 py-1 rounded hover:bg-red-200 hover:text-red-900 border-red-700"
        >
          <IoMdTrash className="mr-1" /> Delete
        </button>
      </td>
    </tr>
  );
};

export default ServiceItem;
