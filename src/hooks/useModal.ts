import { useState } from 'react';

export function useModal(duration = 400) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const open = () => {
    setIsOpen(true);

    setTimeout(() => {
      setIsShow(true);
    }, 0);
  };

  const close = () => {
    setIsShow(false);

    setTimeout(() => {
      setIsOpen(false);
    }, duration);
  };

  return { open, close, isOpen, isShow, duration };
}
