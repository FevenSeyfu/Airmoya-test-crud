import React from 'react';
import PhotoUpload from '../components/HomeContainer/PhotoUpload';
import PhotoGallery from '../components/HomeContainer/PhotoGallery';

const Gallery = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-6 gap-x-8 p-4">
      <div className="w-full lg:w-1/4">
        <PhotoUpload />
      </div>
      <div className="w-full lg:w-3/4">
        <PhotoGallery sliceImages={false} />
      </div>
    </div>
  );
};

export default Gallery;