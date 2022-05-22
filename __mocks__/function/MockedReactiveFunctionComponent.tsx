import { useState } from "react";

import MockChildFunctionComponent from "./MockedChildFunctionComponent";

const MockedReactiveFunctionComponent = () => {
  const [count, setCount] = useState(1);
  const [showCount, setShowCount] = useState(true);

  return (
    <>
      <div onClick={() => setCount(count + 1)}>Click Me</div>
      <div onClick={() => setShowCount(!showCount)}>Toggle Show Count</div>
      {showCount && (
        <MockChildFunctionComponent message={`The count is ${count}`} />
      )}
    </>
  );
};

export default MockedReactiveFunctionComponent;
