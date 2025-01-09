//import styles from "./CreatePage.module.css";

import { useState } from "react";
import CreateNewPost from "../../components/CreateNewPost/CreateNewPost";

const CreatePage = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      Create Page
      <div>
        <button onClick={openModal}>Создать новый пост</button>
        <CreateNewPost showModal={showModal} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default CreatePage;
