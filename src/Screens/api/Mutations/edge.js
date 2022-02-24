import gql from "graphql-tag";

export const CREATE_EDGE_MANY = gql`
  mutation insert_edge($objects: [edge_insert_input!]!) {
    insert_edge(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

const schema = {
  "edge.create.many": CREATE_EDGE_MANY,
};
export default schema;
