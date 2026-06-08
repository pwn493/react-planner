import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  function handleCancel(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <dialog ref={ref} onCancel={handleCancel}>
      {children}
      <div>
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
}

export default Modal;
