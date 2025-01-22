import { useEffect, useRef, useState } from "react";

export const useModalControls = (fn?: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ModalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    // Verifica si el clic fue fuera del div interno
    if (ModalRef.current && !ModalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
      if (fn) {
        fn();
      }
    }
  };
  useEffect(() => {
    // Agrega el evento al hacer clic en el documento
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Limpia el evento al desmontar el componente
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return {
    ModalRef,
    isModalOpen,
    setIsModalOpen,
  };
};
