import React, { useState, useEffect } from 'react';
import ModalComponent from '../../utility/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateService } from '@redux/serviceSlice';

const UpdateServiceModal = ({ isOpen, onRequestClose, serviceId }) => {
  const dispatch = useDispatch();
  const services = useSelector((state) => Array.isArray(state.services.services) ? state.services.services : []);
  const service = services.find((s) => s.id === serviceId);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setDescription(service.description);
      setStatus(service.status);
    }
  }, [service]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateService({ id: serviceId, updatedService: { title, description, status } }));
    onRequestClose();
  };

  return (
    <ModalComponent modalLabel="Edit Service" isOpen={isOpen} onRequestClose={onRequestClose}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Service
          </button>
        </div>
      </form>
    </ModalComponent>
  );
};

export default UpdateServiceModal;