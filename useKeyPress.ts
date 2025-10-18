
import { useState, useEffect, useCallback } from 'react';

export const useKeyPress = () => {
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});

  const handleKeyDown = useCallback(({ key }: KeyboardEvent) => {
    setKeysPressed((prev) => ({ ...prev, [key]: true }));
  }, []);

  const handleKeyUp = useCallback(({ key }: KeyboardEvent) => {
    setKeysPressed((prev) => ({ ...prev, [key]: false }));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return keysPressed;
};
