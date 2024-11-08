import React, { useState } from "react";
import { Audio } from 'react-loader-spinner';
import Button from "@components/utility/Button/Button";
import InputField from "@components/utility/Input/Input";

const SearchBox = ({ isChatOpen, onSearch }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Call onSearch on input change
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    onSearch(searchTerm);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex mx-auto ${isChatOpen ? 'w-[320px] flex-col lg:items-start gap-y-2' : 'w-[450px] items-center gap-x-3 md:gap-y-6 lg:mx-auto'}`}>
      <InputField
        placeholder="Search by username"
        name="search"
        type="text"
        size="regular"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button type="submit" className={`flex items-center text-2xl ${isChatOpen && 'hidden'}`}>
        {loading && (
          <Audio
            height="20"
            width="20"
            color="#fff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        )}
        Search
      </Button>
    </form>
  );
};

export default SearchBox;