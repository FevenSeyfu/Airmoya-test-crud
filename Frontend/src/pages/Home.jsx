import React from 'react';
import ServicesList from '../components/HomeContainer/ServicesList';
import PhotoGallery from '../components/HomeContainer/PhotoGallery';
import PhotoUpload from '../components/HomeContainer/PhotoUpload';

const Home = () => {
  return (
    <section className='w-full flex flex-col gap-y-3 md:gap-y-6'>
      <div className='flex flex-col md:flex-row flex-wrap items-center gap-y-3 md:gap-y-6'>
        <PhotoGallery />
        <PhotoUpload />
      </div>
      <ServicesList />
    </section>
  );
};

export default Home;