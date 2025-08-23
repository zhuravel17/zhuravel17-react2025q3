import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { HookForm } from "./HookForm";
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
        <HookForm onSuccess={onSuccess} />
      </Provider>
    ),
  };
}

describe("HookForm", () => {
  it("renders all form fields", () => {
    renderWithStore();

    expect(screen.getByText("React Hook Form")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Picture:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Start typing/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("shows validation error for invalid email", async () => {
    renderWithStore();

    fireEvent.input(screen.getByLabelText(/Email:/i), {
      target: { value: "not-an-email" },
    });
    fireEvent.blur(screen.getByLabelText(/Email:/i));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it("enables submit button when form is valid", async () => {
    renderWithStore();

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

    const button = screen.getByRole("button", { name: /submit/i });
    await waitFor(() => expect(button).toBeEnabled());
  });

  it("dispatches addHookForm on submit", async () => {
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

    const button = screen.getByRole("button", { name: /submit/i });
    await waitFor(() => expect(button).toBeEnabled());

    fireEvent.click(button);

    await waitFor(() => {
      const state = store.getState().form.hookForms;
      expect(state.length).toBe(1);
      expect(state[0].name).toBe("Alice");
      expect(state[0].picture).toBe("base64string");
    });

    expect(onSuccess).toHaveBeenCalled();
  });
});
