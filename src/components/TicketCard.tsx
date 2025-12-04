import React from "react";
import type { Ticket } from "../features/tickets/ticketsSlice";
import "./TicketCard.scss";

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-card__price">
        {ticket.price.toLocaleString("ru-RU")} ₽
      </div>
      <div className="ticket-card__info">
        <div className="ticket-card__route">
          {ticket.from} → {ticket.to}
        </div>
        <div className="ticket-card__time">{ticket.time}</div>
        <div className="ticket-card__duration">
          В пути {Math.floor(ticket.duration / 60)} ч {ticket.duration % 60} мин
        </div>
        <div className="ticket-card__transfers">
          Пересадок: {ticket.transfers}
        </div>
      </div>
      <div className="ticket-card__airline">{ticket.airline}</div>
    </div>
  );
};

export default TicketCard;
