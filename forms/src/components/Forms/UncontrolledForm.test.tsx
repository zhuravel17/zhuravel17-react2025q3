import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { UncontrolledForm } from "./UncontrolledForm";
import { formReducer } from "../../store/formSlice";
import { countryReducer } from "../../store/countrySlice";
import { imageToBase64 } from "../../utils/imageToBase64";

jest.mock("../../utils/imageToBase64", () => ({
  imageToBase64: jest.fn(),
}));

function renderWithStore(onSuccess = jest.fn()) {
  const store = configureStore({
    reducer: {
      form: formReducer,
      country: countryReducer,
    },
    preloadedState: {
      form: { uncontrolledForms: [], hookForms: [] },
      country: { countries: ["USA", "UK"] },
    },
  });

  return {
    store,
    onSuccess,
    ...render(
      <Provider store={store}>
        <UncontrolledForm onSuccess={onSuccess} />
      </Provider>
    ),
  };
}

describe("UncontrolledForm", () => {
  it("renders all fields", () => {
    renderWithStore();

    expect(screen.getByText("Uncontrolled Form")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Picture:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Start typing/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    renderWithStore();

    fireEvent.input(screen.getByLabelText(/Name:/i), {
      target: { value: "Alice" },
    });
    fireEvent.input(screen.getByLabelText(/Age:/i), {
      target: { value: "25" },
    });
    fireEvent.input(screen.getByLabelText(/Email:/i), {
      target: { value: "wrong-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it("dispatches addUncontrolledForm with valid data", async () => {
    (imageToBase64 as jest.Mock).mockResolvedValue("base64string");
    const { store, onSuccess } = renderWithStore();

    fireEvent.input(screen.getByLabelText(/Name:/i), {
      target: { value: "Alice" },
    });
    fireEvent.input(screen.getByLabelText(/Age:/i), {
      target: { value: "25" },
    });
    fireEvent.input(screen.getByLabelText(/Email:/i), {
      target: { value: "alice@mail.com" },
    });
    fireEvent.input(screen.getByLabelText(/^Password:/i), {
      target: { value: "Password1!" },
    });
    fireEvent.input(screen.getByLabelText(/Confirm Password:/i), {
      target: { value: "Password1!" },
    });
    fireEvent.change(screen.getByLabelText(/Gender:/i), {
      target: { value: "female" },
    });
    fireEvent.click(screen.getByLabelText(/Accept Terms/i));
    fireEvent.input(screen.getByPlaceholderText(/Start typing/i), {
      target: { value: "USA" },
    });

    const file = new File(["dummy"], "avatar.png", { type: "image/png" });
    fireEvent.change(screen.getByLabelText(/Picture:/i), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      const state = store.getState().form.uncontrolledForms;
      expect(state.length).toBe(1);
      expect(state[0].name).toBe("Alice");
      expect(state[0].picture).toBe("base64string");
    });

    expect(onSuccess).toHaveBeenCalled();
  });

  it("shows multiple errors when required fields are missing", async () => {
    renderWithStore();

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/first letter must be uppercase/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/at least one special character/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/please confirm password/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/gender is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/you must accept terms/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/picture is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/please select a valid country/i)
    ).toBeInTheDocument();
  });
});
