import "./style/App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route } from "react-router-dom";
// import AddPage from "./pages/AddPage";
// import ListPage from "./pages/ListPage";
import Header from "./pages/Header";
import Crud from "./pages/Crud";
import Statistics from "./pages/Statistics";
import ModalForm from "./pages/ModalForm";
import AuthProvider from "./utils/context/AuthProvider";
import ListPage from "./pages/ListPage";
import ChartsPage from "./pages/ChartsPage";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path="/">
          <Header />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route path="/statistics">
          <Header />
        </Route>
        <Route path="/crud">
          <Header />
        </Route> */}
        <Route path="/crud/:type/">
          <Crud />
          {/* <AddPage icons={{ clientIcon, bankAccountIcon, transactionIcon }} /> */}
        </Route>
        <Route path="/statistics/:type/">
          <Statistics />
          {/* <ListPage /> */}
        </Route>
        <Route exact path="/crud/:type/:actionType/:action">
          <ModalForm />
        </Route>
        <Route exact path="/statistics/:type/ListPage">
          <ListPage />
        </Route>
        <Route exact path="/statistics/admin/ChartsPage">
          <ChartsPage />
        </Route>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
