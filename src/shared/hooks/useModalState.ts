"use client";
import { useState, useCallback } from "react";

type ModalStateReturn = {
  isOpen: boolean;
  isPen: boolean;
  open: () => void;
  close: () => void;
  start: () => void;
  finish: () => void;
  reset: () => void;
};

export default function useModalState(): ModalStateReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isPen, setIsPen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => { setIsOpen(false); setIsPen(false); }, []);
  const start = useCallback(() => setIsPen(true), []);
  const finish = useCallback(() => setIsPen(false), []);
  const reset = useCallback(() => { setIsOpen(false); setIsPen(false); }, []);

  return { isOpen, isPen, open, close, start, finish, reset };
}
