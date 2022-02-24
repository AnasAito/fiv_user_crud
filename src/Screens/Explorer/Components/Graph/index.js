import React from "react";
import View from "./view.js";

export default function index({ gdata, setNode, selected }) {
  return <View data={gdata} setNode={setNode} selected={selected} />;
}
