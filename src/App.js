import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Screens/Home";
import Explorer from "./Screens/Explorer";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://agriedgegraph.hasura.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret": authToken,
      },
    }),
    cache: new InMemoryCache(),
  });
};
function App() {
  const client = createApolloClient(
    "siv8oJBzOgPEl0Vu32AiH5KroQ79vjLbIgU0cCnEUjoE46sdSMrN5xDaBRyQtkPi"
  );
  return (
    <ApolloProvider client={client}>
      <Router>
        {/*   <Link to="/">Home</Link>*/}

        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/explorer">
            <Explorer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
