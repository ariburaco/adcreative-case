import { useEffect, useState } from 'react';

type UseArrowKeyNavigationProps = {
  itemCount: number;
};

const useArrowKeyNavigation = ({ itemCount }: UseArrowKeyNavigationProps) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault(); // Prevent default scrolling
        setFocusedIndex((prev) => Math.min(prev + 1, itemCount - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [itemCount]);

  return {
    focusedIndex,
    setFocusedIndex,
  };
};

export default useArrowKeyNavigation;
