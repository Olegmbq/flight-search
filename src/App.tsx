import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "./features/tickets/ticketsSlice";
import type { RootState, AppDispatch } from "./app/store";

import TicketCard from "./components/TicketCard";
import SortTabs from "./components/SortTabs";
import Filters from "./components/Filters";
import LoadMoreButton from "./components/LoadMoreButton";
import LoadingScreen from "./components/LoadingScreen";

import "./styles/main.scss";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, filters } = useSelector(
    (state: RootState) => state.tickets
  );

  // 🎬 состояние заставки
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5); // сколько билетов показывать

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  // 💜 Олег & Нейро — неоновое послание с эффектом печати и пульсации
  useEffect(() => {
    const text = "💜 Олег & Нейро — всё возможно, шаг за шагом!";
    let index = 0;

    const print = setInterval(() => {
      console.clear();
      const partial = text.slice(0, index + 1);
      console.log(
        `%c${partial}`,
        "color:#b388ff; font-size:16px; font-weight:bold; text-shadow:0 0 10px #b388ff, 0 0 20px #9d6bff, 0 0 30px #7f3dff;"
      );
      index++;
      if (index === text.length) {
        clearInterval(print);

        // ✨ После печати — лёгкое пульсирующее свечение
        let glow = true;
        setInterval(() => {
          console.clear();
          console.log(
            `%c${text}`,
            `color:#${
              glow ? "d2b6ff" : "b388ff"
            }; font-size:16px; font-weight:bold; text-shadow:0 0 8px #b388ff, 0 0 16px #9d6bff, 0 0 24px #7f3dff;`
          );
          glow = !glow;
        }, 1000);
      }
    }, 80);

    return () => clearInterval(print);
  }, []);

  // 🧠 сортировка и фильтрация
  const filteredTickets = useMemo(() => {
    let result = [...items];

    if (filters.airlines.length > 0) {
      result = result.filter((t) => filters.airlines.includes(t.airline));
    }
    if (filters.transfers.length > 0) {
      result = result.filter((t) => filters.transfers.includes(t.transfers));
    }

    switch (filters.sortBy) {
      case "cheapest":
        return result.sort((a, b) => a.price - b.price);
      case "fastest":
        return result.sort((a, b) => a.duration - b.duration);
      case "optimal":
        return result.sort(
          (a, b) =>
            a.price * 0.6 +
            a.duration * 0.4 -
            (b.price * 0.6 + b.duration * 0.4)
        );
      default:
        return result;
    }
  }, [items, filters]);

  // 💜 заставка при запуске

  if (isLoading) return <LoadingScreen onFinish={() => setIsLoading(false)} />;

  return (
    <div className="app fade-in">
      <div className="main-layout">
        {/* Левая панель фильтров */}
        <aside className="filters-panel">
          <Filters />
        </aside>

        {/* Правая часть — контент */}
        <section className="tickets-area">
          <h1>Поиск авиабилетов ✈️</h1>
          <SortTabs />

          {status === "loading" && <p>Загрузка билетов...</p>}
          {status === "failed" && <p>Ошибка загрузки билетов</p>}

          {status === "succeeded" &&
            filteredTickets
              .slice(0, visibleCount)
              .map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}

          {filteredTickets.length > 0 ? (
            visibleCount < filteredTickets.length ? (
              <LoadMoreButton
                onClick={() => setVisibleCount((prev) => prev + 5)}
              />
            ) : (
              <p className="all-loaded">Все билеты загружены 💜</p>
            )
          ) : (
            <p style={{ textAlign: "center" }}>Нет доступных билетов</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
