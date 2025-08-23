import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { countries } from "../consts/countries";

export interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    addCountry(state, action: PayloadAction<string>) {
      if (!state.countries.includes(action.payload)) {
        state.countries.push(action.payload);
      }
    },
    removeCountry(state, action: PayloadAction<string>) {
      state.countries = state.countries.filter((c) => c !== action.payload);
    },
  },
});

export const { addCountry, removeCountry } = countrySlice.actions;
export const countryReducer = countrySlice.reducer;
