import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MainPage } from "./MainPage";
import { formReducer } from "../../store/formSlice";
import { countryReducer } from "../../store/countrySlice";

function renderWithStore(
  preloadedState = {
    form: { uncontrolledForms: [], hookForms: [] },
    country: { countries: [] },
  }
) {
  const store = configureStore({
    reducer: { form: formReducer, country: countryReducer },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

describe("MainPage modal behavior", () => {
  it("closes modal when overlay is clicked", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Open Uncontrolled Form"));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    fireEvent.click(dialog);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    renderWithStore();
    fireEvent.click(screen.getByText("Open React Hook Form"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/close modal/i));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
