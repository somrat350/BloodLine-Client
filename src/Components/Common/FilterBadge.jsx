import { FaXmark } from 'react-icons/fa6';

const FilterBadge = ({ label, value, onRemove, icon: Icon }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium border border-secondary/20 hover:bg-secondary/20 transition-colors duration-200">
      {Icon && <Icon className="text-xs" />}
      <span className="truncate max-w-32">
        {label}: {value}
      </span>
      <button
        onClick={onRemove}
        className="hover:bg-secondary/20 rounded-full p-1 transition-colors duration-200"
        aria-label={`Remove ${label} filter`}
      >
        <FaXmark className="text-xs" />
      </button>
    </div>
  );
};

export default FilterBadge;