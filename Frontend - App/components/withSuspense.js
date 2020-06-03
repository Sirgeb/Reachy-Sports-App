import React, { Suspense } from "react";
import Loader from './Loader';

export default function withSuspense(Component) {
  return class extends React.Component {
    render() {
      return (
        <Suspense
          fallback={
            <Loader />
          }
        >
          <Component />
        </Suspense>
      );
    }
  };
}
