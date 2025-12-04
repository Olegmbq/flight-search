import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTransfersFilter,
  setAirlinesFilter,
} from "../features/tickets/ticketsSlice";
import type { RootState, AppDispatch } from "../app/store";
import "./Filters.scss";

const Filters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transfers, airlines } = useSelector(
    (state: RootState) => state.tickets.filters
  );

  const [isOpen, setIsOpen] = useState(true);

  const handleTransfersChange = (value: number) => {
    const updated = transfers.includes(value)
      ? transfers.filter((v) => v !== value)
      : [...transfers, value];
    dispatch(setTransfersFilter(updated));
  };

  const handleAirlinesChange = (value: string) => {
    const updated = airlines.includes(value)
      ? airlines.filter((v) => v !== value)
      : [...airlines, value];
    dispatch(setAirlinesFilter(updated));
  };

  return (
    <div className={`filters ${isOpen ? "open" : "collapsed"}`}>
      <button className="filters__toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Скрыть фильтры ▲" : "Показать фильтры ▼"}
      </button>

      {isOpen && (
        <div className="filters__inner fade-in">
          <h2>Фильтры</h2>

          <div className="filters__section">
            <h3>Количество пересадок</h3>
            {[0, 1, 2].map((num) => (
              <label key={num} className="filters__option">
                <input
                  type="checkbox"
                  checked={transfers.includes(num)}
                  onChange={() => handleTransfersChange(num)}
                />
                <span>
                  {num === 0
                    ? "Без пересадок"
                    : num === 1
                    ? "1 пересадка"
                    : "2 пересадки"}
                </span>
              </label>
            ))}
          </div>

          <div className="filters__section">
            <h3>Авиакомпании</h3>
            {["Aeroflot", "S7 Airlines", "Pobeda"].map((name) => (
              <label key={name} className="filters__option">
                <input
                  type="checkbox"
                  checked={airlines.includes(name)}
                  onChange={() => handleAirlinesChange(name)}
                />
                <span>{name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
