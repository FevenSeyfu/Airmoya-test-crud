import React from 'react';
import ServicesList from '../components/HomeContainer/ServicesList';
import PhotoGallery from '../components/HomeContainer/PhotoGallery';

const Home = () => {
  return (
    <section className='w-full h-full flex flex-col gap-y-4 md:gap-y-8'>
      <div className='h-1/2 min-h-[450px]'>
        <PhotoGallery sliceImages={true} />
      </div>
      <div className='h-1/2'>
        <ServicesList />
      </div>
    </section>
  );
};

export default Home;