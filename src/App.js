import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import UserCrud from "./Screens/UserCrud";
import UserAuth from "./Screens/UserAuth";
//const Home = () => <div>home for crud</div>;

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://user-crud.hasura.app/v1/graphql",
      headers: {
        "x-hasura-admin-secret": authToken,
      },
    }),
    cache: new InMemoryCache(),
  });
};
function App() {
  const client = createApolloClient(
    "Kan0M0oitY9n7RgRsmTvc9ouB703UXvYfGA1SZYBbFD8xUG0aqyUGuHAA5fLHUeW"
  );
  return (
    <ApolloProvider client={client}>
      <Router>
        {/*   <Link to="/">Home</Link>*/}

        <Switch>
          <Route path="/">
            <div className="grid grid-cols-2 ">
              <UserCrud />
              <UserAuth />
              <div>
                Help : use the id = user_a to get data about the user for
                example
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
