import React, { useState } from "react";
import View from "./view";
import { useQuery, useMutation } from "@apollo/client";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import schema from "./getAutoTags";
export default function Index({
  node,
  setIsModify,
  refQuery,
  typesQuery,
  NodeCreate,
  EdgeCreate,
  tagsQuery,
  TagCreate,
  NodeTagCreate,
  NodeNeighbors,
  NodeUpdate,
}) {
  const get_neighbors = (data) => {
    const edge_to = get(data, "node_by_pk.edges_to", []).map(
      (e) => e.node_from
    );
    const edge_from = get(data, "node_by_pk.edges_from", []).map(
      (e) => e.node_to
    );
    return edge_to.concat(edge_from);
  };
  const nodeId = get(node, "id", false);
  // get node neighbors
  const { loading: loading_neighbors, data: neighbors } = useQuery(
    NodeNeighbors,
    {
      variables: { id: nodeId },
      skip: !nodeId,
    }
  );
  console.log("neighbors", nodeId, neighbors, get_neighbors(neighbors));

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  // get types enum
  //console.log("create", NodeCreate);
  const { loading: loading_type, data: typesData } = useQuery(typesQuery);
  let types = get(typesData, "type", []);
  // get nodes to be referred
  const { loading: loading_node, data: nodes } = useQuery(refQuery, {
    variables: { where: { label: { _ilike: `%${search}%` } } },
    skip: search == "",
  });
  let nodesSearch = get(nodes, "node", []).map((node) => {
    return { label: node.label, id: node.id, type: node.type };
  });
  // node basic create

  const [NodeUpdate_, { data }] = useMutation(NodeUpdate);
  // edge create
  const [createEdges, { data: edges }] = useMutation(EdgeCreate);
  // get tags
  const { error, loading: loading_tags, data: tags } = useQuery(tagsQuery);
  console.log("existing tags", error, tags);
  // tag create
  const [createTags, { data: newTags }] = useMutation(TagCreate);
  // nodeTags create
  const [createNodeTags, { data: nodeTags }] = useMutation(NodeTagCreate);
  const onSubmit = async (object) => {
    //setLoading(true);
    //console.log(object);
    // todo
    // create node (name , link , description )
    const result = await NodeUpdate_({
      variables: {
        pk_columns: {
          id: object.id,
          //score: 1,
        },
        _set: {
          label: object.label,
          description: object.description,
          link: object.link,
          type: object.type,
          //score: 1,
        },
      },
    });

    console.log("mutaton", result, get(result, "data.update_node_one.id", ""));
    const nodeId = get(result, "data.update_node_one.id", "");
    // create edges
    //*edge list [{from ,to}]
    {
      /*if (nodeId != "") {
      const edges = object.refs.map((ref) => {
        return { from: nodeId, to: ref, label: "edge" };
      });
      const resultsEdges = await createEdges({
        variables: {
          objects: edges,
        },
      });
      console.log("mut edges", resultsEdges);
      // create tags  if not existing
      //* clean then filter new tags
      const existingTags = get(tags, "tag", []).map((tag) =>
        tag.label.toLowerCase().trim()
      );

      const userTags = object.tags.map((tag) => tag.toLowerCase().trim());
      const oldIds = get(tags, "tag", [])
        .filter((tag) => userTags.includes(tag.label.toLowerCase().trim()))
        .map((tag) => tag.id);
      const newTags = userTags.filter((tag) => !existingTags.includes(tag));
      console.log("new tags", newTags);
      // * mutation
      //{label: "", type: ""}
      const finalTags = newTags.map((tag) => {
        return { label: tag, type: "default" };
      });
      const resultsTags = await createTags({
        variables: {
          objects: finalTags,
        },
      });
      console.log("tags mutation", resultsTags);
      // create nodetags
      //*prepare tagIds
      const news = get(resultsTags, "data.insert_tag.returning", []).map(
        (tag) => tag.id
      );
      const alltags = oldIds.concat(news);

      console.log(alltags);
      const nodeTagsObjects = alltags.map((tagId) => {
        return { node_id: nodeId, tag_id: tagId };
      });
      const resultsNodeTags = await createNodeTags({
        variables: {
          objects: nodeTagsObjects,
        },
      });
    }
    setLoading(false);
    // history.push("/home");
  setIsModify(false);*/
    }
  };
  console.log("types", types);
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  return (
    <View
      node={node}
      setIsModify={setIsModify}
      setSearch={setSearch}
      nodesSearch={nodesSearch}
      types={types}
      onSubmit={onSubmit}
      loading={loading}
      getAutoTags={schema["get.auto.tags"]}
      loading_neighbors={loading_neighbors}
      links={get_neighbors(neighbors).filter(onlyUnique)}
    />
  );
}
//
