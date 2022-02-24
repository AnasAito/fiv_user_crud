import React from "react";
import View from "./view";
import { get } from "lodash";

export default function index({ feedNodes }) {
  return <View feedNodes={feedNodes} />;
}
