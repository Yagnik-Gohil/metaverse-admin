import React from "react";

type MapGridItemProps = {
  thumbnail: string;
  title: string;
  details: string;
  onClick?: () => void;
};

const MapGridItem: React.FC<MapGridItemProps> = ({ thumbnail, title, details, onClick }) => {
  return (
    <div
      className="group cursor-pointer bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition"
      onClick={onClick}
    >
      <div className="h-40 w-full bg-gray-200">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover group-hover:opacity-90 transition"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{details}</p>
      </div>
    </div>
  );
};

export default MapGridItem;
