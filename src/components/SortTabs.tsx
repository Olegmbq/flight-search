import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "../features/tickets/ticketsSlice";
import type { RootState, AppDispatch } from "../app/store";
import "./SortTabs.scss";
import clickSound from "../assets/sounds/click.mp3";

type SortType = "cheapest" | "fastest" | "optimal";

const TABS: Array<{ type: SortType; label: string }> = [
  { type: "cheapest", label: "💜 Самый дешёвый" },
  { type: "fastest", label: "⚡ Самый быстрый" },
  { type: "optimal", label: "🌟 Оптимальный" },
];

const SortTabs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sortBy = useSelector(
    (s: RootState) => s.tickets.filters.sortBy as SortType
  );
  const [clicked, setClicked] = useState<SortType | null>(null);

  const handleClick = (type: SortType) => {
    const audio = new Audio(clickSound);
    audio.volume = 0.4;
    audio.play().catch(() => {});
    dispatch(setSortBy(type));
    setClicked(type);
    setTimeout(() => setClicked(null), 400);
  };

  return (
    <div className="sort-tabs">
      {TABS.map(({ type, label }) => (
        <button
          key={type}
          className={`sort-tab ${sortBy === type ? "active" : ""} ${
            clicked === type ? "clicked" : ""
          }`}
          onClick={() => handleClick(type)} // ← без any
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SortTabs;
