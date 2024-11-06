import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "@redux/uploadSlice";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import ModalComponent from "../utility/Modal/Modal";
import Typography from "../utility/Typography/Typography";
import { Audio } from "react-loader-spinner";

const PhotoGallery = ({ sliceImages = false }) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const { images, status, error } = useSelector((state) => state.upload);
  const { id } = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    dispatch(fetchImages(id));
  }, [dispatch, id]);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const displayedImages = sliceImages ? images.slice(0, 5) : images;

  return (
    <article className="w-full h-full min-h-[450px] bg-white rounded-lg shadow-sm relative flex flex-col gap-y-2">
      <div className="p-2">
        <Typography variant="h2" weight="strong" color="primaryHeading">
          My Photos
        </Typography>
      </div>
      {status === 'loading' ? (
        <div className="h-full min-h-[450px] w-full flex items-center justify-center">
          <Audio
            height="100"
            width="100"
            color="#8b74bd"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        </div>
      ) : displayedImages.length === 0 ? (
        <div className="flex items-center justify-center h-full md:min-h-[280px]">
          <Typography variant="h4" weight="medium" color="primary">
            No Images uploaded yet
          </Typography>
        </div>
      ) : (
        <div className={` grid ${sliceImages ? ' grid-cols-2 md:grid-cols-4 md:row-span-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-2 z-60`}>
          {displayedImages.map((photo, index) => {
            const isLastRow = displayedImages.length - index <= 3; 
            const isLastImage = index === displayedImages.length - 1; 
            const columnSpan = isLastRow
              ? displayedImages.length % 3 === 1 && isLastImage 
                ? 'lg:col-span-3'
                : displayedImages.length % 3 === 2 && isLastImage 
                ? 'md:col-span-2'
                : ''
              : ''; 

            return (
              <div
                key={index}
                className={`relative overflow-hidden row-span-2 ${
                  index === 0 && sliceImages ? "col-span-3  " : "col-span-1 "
                } ${columnSpan}`}
                onClick={() => openModal(photo)}
              >
                <img
                  src={`${baseUrl}/${photo.path}`}
                  alt={photo.title}
                  className={`w-full ${sliceImages ? 'h-[150px] md:h-[200px]' : 'h-full max-h-[300px] md:max-h-[500px] '} object-cover opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer `}
                />
              </div>
            );
          })}
        </div>
      )}
      {sliceImages && (
        <Link
          to="/gallery"
          className={`${
            isModalOpen || status === 'loading' || images.length === 0 ? "hidden" : "absolute"
          } bottom-4 right-4 text-white flex items-center gap-x-2 animate-pulse p-4 rounded-md z-20 bg-black bg-opacity-75`}
        >
          <span className="text-2xl underline-offset-4 hover:underline transition-all duration-500">
            View All Photos
          </span>
          <MdChevronRight size={24} />
        </Link>
      )}
      {selectedPhoto && (
        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          modalLabel={selectedPhoto.title}
          className="flex flex-col items-left justify-start text-right"
        >
          <img
            src={`${baseUrl}/${selectedPhoto.path}`}
            alt={selectedPhoto.title}
            className="w-full h-auto my-6 "
          />
          <div className="text-left flex flex-col items-start gap-y-2">
            <Typography variant="h2" weight="strong" color="primary">
              {selectedPhoto.title}
            </Typography>
            <Typography variant="h5" weight="medium" color="primary">
              Size: {selectedPhoto.size}
            </Typography>
            <Typography variant="p" weight="medium" color="primary">
              File Type: {selectedPhoto.fileType}
            </Typography>
          </div>
        </ModalComponent>
      )}
    </article>
  );
};

export default PhotoGallery;
