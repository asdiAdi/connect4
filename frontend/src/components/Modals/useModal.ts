import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (value?: boolean) => {
    if (value !== true && value !== false) {
      setIsOpen((prev) => !prev);
    } else {
      setIsOpen(value);
    }
  };

  return { isOpen, toggle };
}

export default useModal;
