import React from "react";

interface Props {
  children: React.Component;
}

export class ErrorBoundary extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error) {
    console.log("Error boundary: ", error.message.toString());
  }

  render() {
    const { children } = this.props;

    return children;
  }
}
