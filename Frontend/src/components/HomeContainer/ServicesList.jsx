import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import AddServiceModal from "../Service/CreateService/AddServiceModal";
import UpdateServiceModal from "../Service/UpdateService/UpdateServiceModal";
import DeleteServiceModal from "../Service/DeleteService/DeleteServiceModal";
import ServiceItem from "../Service/ShowService/ServiceItem";
import Typography from "../utility/Typography/Typography";
import Pagination from "../utility/Pagination/Pagination"; 
import { fetchServices } from "@redux/serviceSlice";

const Skeleton = ({ width, height }) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded ${width} ${height}`}
    ></div>
  );
};

const ServicesList = () => {
  const services = useSelector((state) => state.services.services || []);
  const status = useSelector((state) => state.services.status);
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

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

  const handleSort = (option) => {
    setSortOption(option);
    setIsSortMenuOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const sortedServices = [...services].sort((a, b) => {
    if (sortOption === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "Z-A") {
      return b.title.localeCompare(a.title);
    } else if (sortOption === "Status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = sortedServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(sortedServices.length / servicesPerPage);

  return (
    <div className="bg-white h-full lg:max-h-[500px] rounded-2xl flex flex-col md:px-4 pb-8">
      <div className="flex justify-between items-center p-2 md:p-4">
        <div className="py-2">
          <Typography variant="h2" weight="strong" color="primaryHeading">
            Services
          </Typography>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <button
              onClick={toggleSortMenu}
              className="bg-white border border-neutral-text p-2 rounded text-left w-24 md:w-32 lg:w-48"
            >
              Sort
            </button>
            {isSortMenuOpen && (
              <div className="absolute right-0 mt-2 w-24 md:w-32 lg:w-48 bg-white border rounded shadow-lg">
                <button
                  className="block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-200"
                  onClick={() => handleSort("A-Z")}
                >
                  A-Z
                </button>
                <button
                  className="block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-200"
                  onClick={() => handleSort("Z-A")}
                >
                  Z-A
                </button>
                <button
                  className="block px-4 py-2 w-full text-left text-gray-800 hover:bg-gray-200"
                  onClick={() => handleSort("Status")}
                >
                  Status
                </button>
              </div>
            )}
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center bg-blue-500 text-white p-2 md:px-4 py-2 rounded hover:bg-blue-700"
          >
            <IoMdAdd className="md:mr-2" size={24} />
            <Typography
              variant="body2"
              weight="regular"
              color="white"
              className="hidden md:flex"
            >
              Add Service
            </Typography>
          </button>
        </div>
      </div>
      {status === "loading" ? (
        <div className="flex w-full items-center justify-center p-2 md:p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="flex flex-row items-start w-full">
                <th className="border-b py-2 w-1/3 md:w-[15%] lg:w-[10%] text-left">
                  <Skeleton width="w-full" height="h-6" />
                </th>
                <th className="border-b py-2 w-1/3 md:w-[15%] lg:w-[10%] text-left">
                  <Skeleton width="w-full" height="h-6" />
                </th>
                <th className="border-b py-2 w-1/3 md:w-[45%] lg:w-[65%] text-left hidden md:flex">
                  <Skeleton width="w-full" height="h-6" />
                </th>
                <th className="border-b py-2 w-1/3 md:w-[15%] text-left flex justify-center md:justify-start md:items-center">
                  <Skeleton width="w-full" height="h-6" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="flex flex-row items-start w-full">
                  <td className="border-b py-2 w-1/3 md:w-[15%] lg:w-[10%] text-left">
                    <Skeleton width="w-full" height="h-6" />
                  </td>
                  <td className="border-b py-2 w-1/3 md:w-[15%] lg:w-[10%] text-left">
                    <Skeleton width="w-full" height="h-6" />
                  </td>
                  <td className="border-b py-2 md:w-[50%] lg:w-[60%] hidden md:flex">
                    <Skeleton width="w-full" height="h-6" />
                  </td>
                  <td className="border-b py-2 w-1/3 md:w-[15%] text-left flex flex-row justify-center md:items-center gap-x-2">
                    <Skeleton width="w-full" height="h-6" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : services.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p>No Services added at the moment</p>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center p-2 md:p-6 md:pb-3">
          <table className="w-full border-collapse">
            <thead>
              <tr className="flex flex-row items-start w-full">
                <th className="border-b py-2 w-1/3 md:w-[15%] lg:w-[10%] text-left">
                  <Typography variant="h3" weight="medium" color="primary">
                    Service
                  </Typography>
                </th>
                <th className="border-b py-2 w-1/3 md:w-[15%] lg:w-[10%] text-left">
                  <Typography variant="h3" weight="medium" color="primary">
                    Status
                  </Typography>
                </th>
                <th className="border-b py-2 w-1/3 md:w-[45%] lg:w-[65%] text-left hidden md:flex">
                  <Typography variant="h3" weight="medium" color="primary">
                    Description
                  </Typography>
                </th>
                <th className="border-b py-2 w-1/3 md:w-[15%] text-left flex justify-center md:justify-start md:items-center">
                  <Typography variant="h3" weight="medium" color="primary">
                    Action
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentServices) &&
                currentServices.map((service) => (
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
      {sortedServices.length > servicesPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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