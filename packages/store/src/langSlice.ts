import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Lang = "pt" | "en";

interface LangState {
  current: Lang;
}

const initialState: LangState = { current: "pt" };

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Lang>) {
      state.current = action.payload;
    },
  },
});

export const setLanguage = langSlice.actions.setLanguage;
export const selectLanguage = (state: { lang: LangState }) => state.lang.current;
export const langReducer = langSlice.reducer;
