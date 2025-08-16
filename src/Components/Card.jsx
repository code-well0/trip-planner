import { useNavigate } from "react-router-dom";

const Card = ({ tour, getRemoveId }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/plan/${tour.id}`)}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700 group cursor-pointer"
    >
      <img
        src={tour.image}
        alt={tour.name}
        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          {tour.emoji} {tour.name}
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({tour.region})
          </span>
        </h3>

        <p className="text-gray-500 dark:text-gray-300 text-base mb-4">
          {tour.info.substring(0, 100)}...
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold text-lg">
            ₹ {tour.price}
          </span>
          <span className="text-sm text-gray-400">{tour.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
