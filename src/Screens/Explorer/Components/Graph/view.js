import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import ForceGraph2D from "react-force-graph-2d";
import useWindowSize from "./useWindowSize";
export default function View({ data, setNode, selected }) {
  const fgRef = useRef();
  console.log("selected", selected);
  const graphData = useMemo(() => data, [data]);
  const RATIO = 50;
  const type_to_color = {
    dataset: "#006d77",

    code: "#83c5be",

    paper: "#F3C677",

    project: "#e29578",

    hardware: "#B7CE63",

    document: "#ffddd2",

    api: "#CB04A5",
    bg: "#edf6f9",
  };

  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeClick = (node) => {
    // first zoom at node

    fgRef.current.centerAt(node.x, node.y, 1000);
    fgRef.current.zoom(5, 1000);
    // highlight nodes
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      setNode(node);
      highlightNodes.add(node.id);

      data.links
        .filter((e) => e.source.id == node.id || e.target.id == node.id)
        .forEach((e) => {
          highlightLinks.add({ source: e.source.id, target: e.target.id });

          if (e.source.id == node.id) {
            const nodeId = e.target.id;
            const neighbor = data.nodes.filter((node) => node.id == nodeId)[0];
            highlightNodes.add(neighbor.id);
          }
          if (e.target.id == node.id) {
            const nodeId = e.source.id;
            const neighbor = data.nodes.filter((node) => node.id == nodeId)[0];
            highlightNodes.add(neighbor.id);
          }
        });
      setHoverNode(node.id);
      updateHighlight();
    }
  };
  const paintRing = useCallback(
    ({ id, x, y, score, type, isSelect }, ctx) => {
      // ring
      if (highlightNodes.has(id)) {
        ctx.fillStyle = id === hoverNode ? "#0075A2" : "#28AFB0";
        ctx.beginPath();
        ctx.arc(x, y, 2 + RATIO * score, 0, 2 * Math.PI, false);
        ctx.fill();
      }
      // main node
      ctx.fillStyle = type_to_color[type];
      ctx.beginPath();
      ctx.arc(x, y, 1 + RATIO * score, 0, 2 * Math.PI, false);

      //ctx.globalAlpha = 0.5;
      // console.log(isSearch);
      if (isSelect) {
        //ctx.globalAlpha = 1;
        ctx.fillStyle = "red";
      }
      ctx.fill(); // 0-15
    },
    [hoverNode, selected]
  );
  const hasLink = (linkList, link) => {
    let has = false;
    linkList.forEach((e) => {
      if (e.source == link.source.id && e.target == link.target.id) {
        has = true;
      }
    });

    return has;
  };

  return (
    <ForceGraph2D
      backgroundColor={type_to_color["bg"]}
      ref={fgRef}
      graphData={graphData}
      autoPauseRedraw={false}
      linkWidth={(link) => {
        return hasLink(highlightLinks, link) ? 5 : 1;
      }}
      nodeCanvasObject={paintRing}
      linkDirectionalParticles={4}
      linkDirectionalParticleWidth={(link) => {
        return hasLink(highlightLinks, link) ? 4 : 0;
      }}
      onNodeClick={handleNodeClick}
    />
  );
}
