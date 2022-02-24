import { gql } from "@apollo/client";

export const USER_GET_MANY = gql`
  query user($where: user_bool_exp, $limit: Int, $offset: Int) {
    user(where: $where, limit: $limit, offset: $offset) {
      userId
    }
  }
`;

export const USER_GET_ONE = gql`
  query user_by_pk($id: uuid!) {
    user_by_pk(userId: $id) {
      userId
    }
  }
`;
export const USER_GET_ID = gql`
  query user_by_pk($id: String!) {
    user_by_pk(userId: $id) {
      userId
    }
  }
`;
export const USER_GET_FIRSTNAME = gql`
  query user_by_pk($id: String!) {
    user_by_pk(userId: $id) {
      firstName
    }
  }
`;
export const USER_GET_LASTNAME = gql`
  query user_by_pk($id: String!) {
    user_by_pk(userId: $id) {
      lastName
    }
  }
`;
export const USER_GET_EMAIL = gql`
  query user_by_pk($id: String!) {
    user_by_pk(userId: $id) {
      email
    }
  }
`;
export const USER_LOGIN = gql`
  query user_by_pk($email: String!) {
    user(where: { email: { _eq: $email } }) {
      email
      userPassword
    }
  }
`;

export default {
  "user.get.many": USER_GET_MANY,
  "user.get.one": USER_GET_ONE,
  "user.get.id": USER_GET_ID,
  "user.get.first_name": USER_GET_FIRSTNAME,
  "user.get.last_name": USER_GET_LASTNAME,
  "user.get.email": USER_GET_EMAIL,
  "user.login": USER_LOGIN,
};
