import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchTickets } from "../../api/ticketsApi";

export interface Ticket {
  id: number;
  price: number;
  duration: number;
  airline: string;
  transfers: number;
  from: string;
  to: string;
  time: string;
}

interface TicketsState {
  items: Ticket[];
  status: "idle" | "loading" | "succeeded" | "failed";
  filters: {
    transfers: number[];
    airlines: string[];
    sortBy: "cheapest" | "fastest" | "optimal";
  };
}

// 🟢 1️⃣ Базовое состояние
const initialState: TicketsState = {
  items: [],
  status: "idle",
  filters: { transfers: [], airlines: [], sortBy: "cheapest" },
};

// 🟢 2️⃣ Основная загрузка билетов
export const getTickets = createAsyncThunk("tickets/fetch", async () => {
  const data = await fetchTickets();
  return data;
});

// 🟢 3️⃣ Дополнительная загрузка (для кнопки "Загрузить ещё билеты")
export const loadMoreTickets = createAsyncThunk(
  "tickets/loadMore",
  async () => {
    const extra = await new Promise<Ticket[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 4,
            price: 18900,
            duration: 200,
            airline: "Pobeda",
            transfers: 0,
            from: "SVO",
            to: "LED",
            time: "19:00 – 22:20",
          },
          {
            id: 5,
            price: 25500,
            duration: 180,
            airline: "S7 Airlines",
            transfers: 1,
            from: "SVO",
            to: "LED",
            time: "06:30 – 09:30",
          },
        ]);
      }, 1200);
    });
    return extra;
  }
);

// 🟣 4️⃣ Срез состояния
const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTransfersFilter(state, action: PayloadAction<number[]>) {
      state.filters.transfers = action.payload;
    },
    setAirlinesFilter(state, action: PayloadAction<string[]>) {
      state.filters.airlines = action.payload;
    },
    setSortBy(
      state,
      action: PayloadAction<"cheapest" | "fastest" | "optimal">
    ) {
      state.filters.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Основная загрузка
    builder
      .addCase(getTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload as Ticket[];
      })
      .addCase(getTickets.rejected, (state) => {
        state.status = "failed";
      });

    // Дополнительная загрузка
    builder
      .addCase(loadMoreTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadMoreTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...(action.payload as Ticket[])];
      })
      .addCase(loadMoreTickets.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// 🟢 5️⃣ Экспортируем действия и редьюсер
export const { setTransfersFilter, setAirlinesFilter, setSortBy } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
