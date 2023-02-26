import { useState, useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { getDatabase, ref, onValue } from 'firebase/database';

const db = getDatabase();

const FallModal = function () {
  const [showModal, setShowModal] = useState(false);
  const [oldFalls, setOldFalls] = useState(null);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    const newFall = ref(db, 'QtC8bjpq2EUreDk27XNnBTTdUvg1' + '/yyy');
    onValue(newFall, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      console.log(oldFalls);
      if (data !== oldFalls) {
        openModal();
      }
      setOldFalls(data);
    });
  }, []);

  return (
    <Modal show={showModal} size="md" popup={true}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            A fall was detected for your care patient!
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={closeModal}>
              Okay
            </Button>
            {/* <Button color="gray">No, cancel</Button> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FallModal;
