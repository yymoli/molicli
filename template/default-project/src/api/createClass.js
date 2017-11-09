import React from "react";
// import ImmutablePureRenderMixin from "./ImmutablePureRenderMixin";

function createReactClass(spec) {
  if (spec instanceof Function) {
    let fn = spec;
    spec = {
      render() {
        return fn.call(this, this.props);
      }
    }
  }

  // if (spec.mixins) {
  //   spec.mixins.push(ImmutablePureRenderMixin);
  // } else {
  //   spec.mixins = [ImmutablePureRenderMixin];
  // }
  return React.createClass(spec);
}

export default createReactClass;
