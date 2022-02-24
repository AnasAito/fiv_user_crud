import gql from "graphql-tag";

export const CREATE_NODE_TAG_MANY = gql`
  mutation insert_node_tag($objects: [node_tag_insert_input!]!) {
    insert_node_tag(objects: $objects) {
      returning {
        tag_id
      }
    }
  }
`;

const schema = {
  "node.tag.create.many": CREATE_NODE_TAG_MANY,
};
export default schema;
