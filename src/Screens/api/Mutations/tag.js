import gql from "graphql-tag";

export const CREATE_TAG_MANY = gql`
  mutation insert_tag($objects: [tag_insert_input!]!) {
    insert_tag(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

const schema = {
  "tag.create.many": CREATE_TAG_MANY,
};
export default schema;
