import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer, { toggleItem } from '../../store/selectedSlice';
import { SelectedFlyout } from './SelectedFlyout';
import { baseCharacter } from '../../__tests__/mockData';
import type { Store } from '@reduxjs/toolkit';

function setupStore(): Store {
  return configureStore({
    reducer: {
      selected: selectedReducer,
    },
  });
}

describe('SelectedFlyout', () => {
  it('does not render when no items are selected', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <SelectedFlyout />
      </Provider>
    );

    expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
  });

  it('renders correctly when item is added', () => {
    const store = setupStore();
    store.dispatch(toggleItem(baseCharacter));

    render(
      <Provider store={store}>
        <SelectedFlyout />
      </Provider>
    );

    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Download/i })
    ).toBeInTheDocument();
  });

  it('clears selected items when "Unselect all" is clicked', () => {
    const store = setupStore();
    store.dispatch(toggleItem(baseCharacter));

    render(
      <Provider store={store}>
        <SelectedFlyout />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Unselect all/i }));

    expect(store.getState().selected.selected).toEqual([]);
  });
});
