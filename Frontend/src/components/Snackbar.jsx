import { useEffect } from "react";
import "./Snackbar.css";

function Snackbar({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`snackbar snackbar-${type}`}>
      <span>{message}</span>

      <button type="button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

export default Snackbar;
