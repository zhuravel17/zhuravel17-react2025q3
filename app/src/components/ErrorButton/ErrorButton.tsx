import { Component, ReactNode } from 'react';
import './ErrorButton.styles.css';

interface ErrorButtonState {
  shouldThrow: boolean;
}

export class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = {
      shouldThrow: false,
    };
  }

  handleClick = (): void => {
    this.setState({ shouldThrow: true });
  };

  render(): ReactNode {
    if (this.state.shouldThrow) {
      throw new Error('Test error from ErrorButton');
    }
    return (
      <div className="button-container">
        <button className="error-button" onClick={this.handleClick}>
          Throw Error
        </button>
      </div>
    );
  }
}
