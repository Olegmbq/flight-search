import React, { useEffect, useState } from "react";
import "./LoadingScreen.scss";
import whoosh from "../assets/sounds/whoosh.mp3";

interface Props {
  onFinish: () => void; // 🔧 добавим колбэк, чтобы управлять переходом
}

const LoadingScreen: React.FC<Props> = ({ onFinish }) => {
  const [canPlay, setCanPlay] = useState(false);
  const [played, setPlayed] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (canPlay && !played) {
      const audio = new Audio(whoosh);
      audio.volume = 0.6;
      audio.play().catch(() => console.warn("Автозвук заблокирован браузером"));
      setPlayed(true);
    }

    // 🎬 через 6 секунд начинаем fade-out, потом завершаем
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 1000); // ⏳ плавное исчезновение
    }, 6000);

    return () => clearTimeout(timer);
  }, [canPlay, played, onFinish]);

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      {!canPlay && (
        <button
          className="sound-start fade-in"
          onClick={() => setCanPlay(true)}
        >
          🔊 Включить звук взлёта
        </button>
      )}
      <div className="loading-content fade-in">
        <h1 className="brand-title">Oleg & Neuro Airlines</h1>
        <p className="tagline">Подготовка к взлёту ✈️</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
