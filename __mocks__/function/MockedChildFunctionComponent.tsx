const MockedChildFunctionComponent = (props: { message: string }) => {
  const { message } = props;

  return <div>Hello, {message}</div>;
};

export default MockedChildFunctionComponent;
