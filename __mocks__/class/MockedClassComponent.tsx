import { Component } from "react";

import MockChildClassComponent from "./MockedChildClassComponent";

class MockedClassComponent extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <MockChildClassComponent message="World" />
      </div>
    );
  }
}

export default MockedClassComponent;
