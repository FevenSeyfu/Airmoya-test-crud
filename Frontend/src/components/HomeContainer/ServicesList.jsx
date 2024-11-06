import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import AddServiceModal from "../Service/CreateService/AddServiceModal";
import UpdateServiceModal from "../Service/UpdateService/UpdateServiceModal";
import DeleteServiceModal from "../Service/DeleteService/DeleteServiceModal";
import ServiceItem from "../Service/ShowService/ServiceItem";
import Typography from "../utility/Typography/Typography";
import { fetchServices } from "@redux/serviceSlice";

const ServicesList = () => {
  const services = useSelector((state) => state.services.services || []);
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    dispatch(fetchServices());
  };

  const openEditModal = (id) => {
    setSelectedServiceId(id);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    dispatch(fetchServices());
  };

  const openDeleteModal = (id) => {
    setSelectedServiceId(id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    dispatch(fetchServices());
  };

  const toggleSortMenu = () => setIsSortMenuOpen(!isSortMenuOpen);

  return (
    <div className="bg-white h-[500px] rounded-2xl flex flex-col px-4">
      <div className="flex justify-between items-center p-4">
        <div className="py-2">
          <Typography variant="h2" weight="strong" color="primaryHeading">
            Services
          </Typography>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <button
              onClick={toggleSortMenu}
              className="bg-white border border-neutral-text p-2 rounded text-left w-48"
            >
              Sort
            </button>
            {isSortMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <button className="block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-200">
                  A-Z
                </button>
                <button className="block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-200">
                  Z-A
                </button>
                <button className="block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-200">
                  Status
                </button>
              </div>
            )}
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <IoMdAdd className="mr-2" /> Add Service
          </button>
        </div>
      </div>
      {services.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p>No Services added at the moment</p>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center p-3 md:p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className='flex flex-row items-start w-full'>
                <th className="border-b py-2 w-[10%] text-left">Service</th>
                <th className="border-b py-2 w-[10%] text-left">Status</th>
                <th className="border-b py-2 w-[65%] text-left">Description</th>
                <th className="border-b py-2 w-[15%] text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(services) &&
                services.map((service) => (
                  <ServiceItem
                    key={service.id}
                    service={service}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
      <AddServiceModal isOpen={isAddModalOpen} onRequestClose={closeAddModal} />
      <UpdateServiceModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        serviceId={selectedServiceId}
      />
      <DeleteServiceModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        serviceId={selectedServiceId}
      />
    </div>
  );
};

export default ServicesList;
