import React from 'react';
import ServicesList from '../components/HomeContainer/ServicesList';
import PhotoGallery from '../components/HomeContainer/PhotoGallery';
import PhotoUpload from '../components/HomeContainer/PhotoUpload';

const Home = () => {
  return (
    <section className='w-full flex flex-col gap-y-3 md:gap-y-6'>
      <div className='h-2/3 grid grid-cols-1 md:grid-cols-3 items-start gap-y-3 md:gap-x-2'>
        <div className="w-full md:col-span-2">
          <PhotoGallery />
        </div>
        <div className="w-full md:col-span-1">
          <PhotoUpload />
        </div>
      </div>
      <ServicesList />
    </section>
  );
};

export default Home;