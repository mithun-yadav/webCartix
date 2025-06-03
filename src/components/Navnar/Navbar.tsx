import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux-toolkit/store";
import { FaShoppingCart, FaSignOutAlt, FaStoreAlt } from "react-icons/fa";
import ConfirmModal from "../confirmModal/confirmModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <FaStoreAlt />
          <span>WEBCRATIX</span>
        </div>
        <div className={styles.actions}>
          <div className={styles.icon} onClick={() => navigate("/cart")}>
            <FaShoppingCart size={20} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </div>
          <div className={styles.icon} onClick={() => setShowModal(true)}>
            <FaSignOutAlt size={20} />
          </div>
        </div>
      </nav>
      <ConfirmModal
        isOpen={showModal}
        message={`Are you sure you want to log out?`}
        onConfirm={handleLogout}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default Navbar;
