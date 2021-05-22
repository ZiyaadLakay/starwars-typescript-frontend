import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query {
    getPeople {
      count
      results {
        name
        height
        mass
        gender
        homeworld
      }
    }
  }
`;

export const GET_PAGE = gql`
  query getPage($page: Int!) {
    getPage(page: $page) {
      count
      results {
        name
        height
        mass
        gender
        homeworld
      }
    }
  }
`;

export const GET_HOMEWORLD = gql`
  query getHomeworld($url: String!) {
    getHomeworld(url: $url) {
      name
    }
  }
`;
