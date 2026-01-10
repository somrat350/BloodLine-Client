import { useState, useEffect } from 'react';

const SearchAnimation = ({ isSearching, resultsCount }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isSearching]);

  if (!isSearching) return null;

  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2 text-secondary">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-secondary border-t-transparent"></div>
        <span className="text-sm font-medium">
          Searching{dots}
        </span>
      </div>
    </div>
  );
};

export default SearchAnimation;