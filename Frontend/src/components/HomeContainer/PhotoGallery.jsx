import React, { useState, useEffect } from "react";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import ModalComponent from "../utility/Modal/Modal";
import Typography from "../utility/Typography/Typography";
import { Audio } from "react-loader-spinner";

const PhotoGallery = () => {
  const photos = Array.from({ length: 7 }, (_, index) => ({
    src: `https://loremflickr.com/200/200?random=${index + 1}`,
    title: `Photo ${index + 1}`,
    size: "200x200",
    fileType: "jpg",
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  useEffect(() => {
    const imagePromises = photos.map((photo) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = photo.src;
        img.onload = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoading(false);
    });
  }, [photos]);

  return (
    <article className="w-full md:w-2/3 bg-white rounded-lg shadow-sm shadow-dark-blue p-4 relative flex flex-col gap-y-2">
      <Typography variant="h1" weight="strong" color="primaryHeading">
        My Photos
      </Typography>
      {isLoading ? (
       <div className="flex items-start justify-center">
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
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4  z-10">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`relative overflow-hidden row-span-2 ${
                index === 0 ? "col-span-2 " : "col-span-1 "
              }`}
              onClick={() => openModal(photo)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
      <Link
        to="/gallery"
        className={`${
          isModalOpen || isLoading ? "hidden" : "absolute"
        } bottom-4 right-4 text-white flex items-center gap-x-2 animate-pulse p-4 rounded-md z-20 bg-black bg-opacity-75`}
      >
        <span className="text-2xl underline-offset-4 hover:underline transition-all duration-500">
          View All Photos
        </span>
        <MdChevronRight size={24} />
      </Link>
      {selectedPhoto && (
        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          modalLabel={selectedPhoto.title}
          className="flex flex-col items-left justify-start text-right"
        >
          <img
            src={selectedPhoto.src}
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