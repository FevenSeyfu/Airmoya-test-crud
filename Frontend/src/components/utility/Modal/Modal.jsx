import React from 'react';
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';

Modal.setAppElement('#root');

const ModalComponent = ({ modalLabel, isOpen, onRequestClose, children,className }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-25"
      contentLabel={modalLabel}
    >
      <div className={`relative bg-white text-black rounded-xl shadow-md shadow-light-purple p-6 flex flex-col w-2/3 max-w-lg mx-auto ${className}`}>
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 text-dark-blue hover:text-white hover:bg-dark-blue rounded-md"
        >
          <IoMdClose size={30} />
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default ModalComponent;