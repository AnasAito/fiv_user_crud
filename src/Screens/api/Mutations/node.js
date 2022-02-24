import gql from "graphql-tag";

export const CREATE_NODE_ONE = gql`
  mutation insert_node_one($object: node_insert_input!) {
    insert_node_one(object: $object) {
      id
    }
  }
`;
export const UPDATE_NODE_ONE = gql`
  mutation update_node_by_pk(
    $pk_columns: node_pk_columns_input!
    $_set: node_set_input
  ) {
    update_node_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const schema = {
  "node.create.one": CREATE_NODE_ONE,
  "node.update.one": UPDATE_NODE_ONE,
};
export default schema;
