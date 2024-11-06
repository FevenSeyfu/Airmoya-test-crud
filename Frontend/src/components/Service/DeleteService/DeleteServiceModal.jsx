import React from 'react';
import ModalComponent from '../../utility/Modal/Modal';
import { useDispatch } from 'react-redux';
import { deleteService } from '@redux/serviceSlice';

const DeleteServiceModal = ({ isOpen, onRequestClose, serviceId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteService(serviceId));
    onRequestClose();
  };

  return (
    <ModalComponent modalLabel="Delete Service" isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="text-center">
        <p>Are you sure you want to delete the service?</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={onRequestClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-700 hover:bg-red-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default DeleteServiceModal;