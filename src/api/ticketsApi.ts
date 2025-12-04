import type { Ticket } from "../features/tickets/ticketsSlice";

// Эмуляция задержки сервера (1 секунда)
export async function fetchTickets(): Promise<Ticket[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          price: 12680,
          duration: 270,
          airline: "Pobeda",
          transfers: 1,
          from: "SVO",
          to: "LED",
          time: "12:00 – 18:30",
        },
        {
          id: 2,
          price: 21500,
          duration: 160,
          airline: "Red Wings",
          transfers: 0,
          from: "SVO",
          to: "LED",
          time: "14:00 – 16:40",
        },
        {
          id: 3,
          price: 23995,
          duration: 250,
          airline: "S7 Airlines",
          transfers: 2,
          from: "SVO",
          to: "LED",
          time: "04:50 – 13:30",
        },
        {
          id: 4,
          price: 14200,
          duration: 190,
          airline: "Aeroflot",
          transfers: 0,
          from: "DME",
          to: "LED",
          time: "09:10 – 12:20",
        },
        {
          id: 5,
          price: 9800,
          duration: 210,
          airline: "Ural Airlines",
          transfers: 1,
          from: "VKO",
          to: "LED",
          time: "07:30 – 11:00",
        },
        {
          id: 6,
          price: 15400,
          duration: 180,
          airline: "S7 Airlines",
          transfers: 0,
          from: "SVO",
          to: "LED",
          time: "15:10 – 18:10",
        },
      ]);
    }, 1000);
  });
}
