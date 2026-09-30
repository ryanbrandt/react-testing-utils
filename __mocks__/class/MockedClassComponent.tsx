import { Component } from "react";

import MockChildClassComponent from "./MockedChildClassComponent";

class MockedClassComponent extends Component {
  render() {
    return (
      <div>
        <MockChildClassComponent message="World" />
      </div>
    );
  }
}

export default MockedClassComponent;
