import { Component } from "react";

import MockChildClassComponent from "./MockChildClassComponent";

class MockClassComponent extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <MockChildClassComponent message="World" />
      </div>
    );
  }
}

export default MockClassComponent;
