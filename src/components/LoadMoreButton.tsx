import React, { useState } from "react";
import clickSound from "../assets/sounds/click.mp3";
import "./LoadMoreButton.scss";

// 👇 Добавь этот интерфейс
interface LoadMoreButtonProps {
  onClick?: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.4;
    audio.play().catch(() => {});

    setClicked(true);
    setTimeout(() => setClicked(false), 400);

    // 👇 если onClick передан — вызываем
    if (onClick) onClick();
  };

  return (
    <button
      className={`load-more-button ${clicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      Загрузить ещё билеты
    </button>
  );
};

export default LoadMoreButton;
