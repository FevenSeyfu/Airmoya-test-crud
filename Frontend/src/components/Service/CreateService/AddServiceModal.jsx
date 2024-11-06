import React, { useState } from 'react';
import ModalComponent from '../../utility/Modal/Modal';
import InputField from '../../utility/Input/Input';
import { useDispatch } from 'react-redux';
import { addService } from '@redux/serviceSlice';

const AddServiceModal = ({ isOpen, onRequestClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const dispatch = useDispatch();

  const validate = (field, value) => {
    const newErrors = { ...errors };

    if (field === 'title') {
      if (!value.trim()) {
        newErrors.title = 'Title is required';
      } else if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) {
        newErrors.title = 'Title must be words only';
      } else {
        delete newErrors.title;
      }
    }

    if (field === 'description') {
      if (!value.trim()) {
        newErrors.description = 'Description is required';
      } else if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) {
        newErrors.description = 'Description must be words only';
      } else if (value.trim().split(/\s+/).length < 8) {
        newErrors.description = 'Description must have a minimum of 8 words';
      } else {
        delete newErrors.description;
      }
    }

    setErrors(newErrors);
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validate(field, field === 'title' ? title : description);
  };

  const handleChange = (field, value) => {
    if (field === 'title') {
      setTitle(value);
    } else if (field === 'description') {
      setDescription(value);
    }
    if (touched[field]) {
      validate(field, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(addService({ title, description, status }));
      onRequestClose();
    }
  };

  return (
    <ModalComponent modalLabel="Add Service" isOpen={isOpen} onRequestClose={onRequestClose}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <InputField
            placeholder="Enter Title"
            name="title"
            value={title}
            onChange={(e) => handleChange('title', e.target.value)}
            onBlur={() => handleBlur('title')}
            state={errors.title ? "error" : "default"}
            helperMessage={errors.title}
            size="regular"
            isRequired={true}
            label="Title"
          />
        </div>
        <div className="mb-4">
          <InputField
            placeholder="Enter Description"
            name="description"
            value={description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            state={errors.description ? "error" : "default"}
            helperMessage={errors.description}
            size="regular"
            isRequired={true}
            label="Description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded-md w-full py-2 p-3 text-black bg-gray-50 text-xl leading-tight focus:outline-none focus:shadow-outline"
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
            disabled={!!errors.title || !!errors.description}
          >
            Add Service
          </button>
        </div>
      </form>
    </ModalComponent>
  );
};

export default AddServiceModal;