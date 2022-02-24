import React, { useState } from "react";
import View from "./view";
export default function Index({
  refQuery,
  typesQuery,
  NodeCreate,
  EdgeCreate,
  tagsQuery,
  TagCreate,
  NodeTagCreate,
}) {
  const [create, setCreate] = useState(false);
  return (
    <View
      create={create}
      setCreate={setCreate}
      refQuery={refQuery}
      typesQuery={typesQuery}
      NodeCreate={NodeCreate}
      EdgeCreate={EdgeCreate}
      tagsQuery={tagsQuery}
      TagCreate={TagCreate}
      NodeTagCreate={NodeTagCreate}
    />
  );
}
