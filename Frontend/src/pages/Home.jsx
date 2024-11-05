import React from 'react';
import ServicesList from '../components/HomeContainer/ServicesList';
import PhotoGallery from '../components/HomeContainer/PhotoGallery';

const Home = () => {
  return (
    <section className='w-full h-full flex flex-col gap-y-3 md:gap-y-6'>
      <div className='h-1/2'>
        <PhotoGallery sliceImages={true} />
      </div>
      <div className='h-1/2'>
        <ServicesList />
      </div>
    </section>
  );
};

export default Home;