import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import { GiMeat } from 'react-icons/gi';
import '../styles/DietPills.css';

const DietPills = ({ activeDiet, setActiveDiet }) => {
  const dietOptions = [
    { key: 'All', label: 'All', icon: null },
    { key: 'Veg', label: 'Veg', icon: FaLeaf },
    { key: 'Non-Veg', label: 'Non-Veg', icon: GiMeat }
  ];

  return (
    <div className="diet-pills">
      {dietOptions.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          className={`diet-pill ${activeDiet === key ? 'active' : ''}`}
          onClick={() => setActiveDiet(key)}
        >
          {Icon && <Icon className="diet-icon" />}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default DietPills;
