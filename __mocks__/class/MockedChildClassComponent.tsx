import { Component } from "react";

interface Props {
  message: string;
}

class MockedChildClassComponent extends Component<Props> {
  render() {
    const { message } = this.props;

    return <div>Hello, {message}</div>;
  }
}

export default MockedChildClassComponent;
