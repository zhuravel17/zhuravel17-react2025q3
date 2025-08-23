import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface StoredFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
}

export interface FormState {
  uncontrolledForms: StoredFormData[];
  hookForms: StoredFormData[];
}

const initialState: FormState = {
  uncontrolledForms: [],
  hookForms: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addUncontrolledForm(state, action: PayloadAction<StoredFormData>) {
      state.uncontrolledForms.push(action.payload);
    },
    addHookForm(state, action: PayloadAction<StoredFormData>) {
      state.hookForms.push(action.payload);
    },
  },
});

export const { addUncontrolledForm, addHookForm } = formSlice.actions;
export const formReducer = formSlice.reducer;
