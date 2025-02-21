import { useEffect, useRef, useState } from "react";

// Estas props son opcionales
type ModalControlProps = {
  // Función que se ejecuta al cerrar el modal
  onClose?: () => void;
  // Permitir cerrar el modal al hacer clic fuera de él (Por defecto se permite el comportamiento)
  allowCloseOnClickOutside?: boolean;
};

export const useModalControls = ({
  onClose,
  allowCloseOnClickOutside = true,
}: ModalControlProps = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ModalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (!allowCloseOnClickOutside) return;
    // Verifica si el clic fue fuera del div interno
    if (ModalRef.current && !ModalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
      if (onClose) {
        onClose();
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
