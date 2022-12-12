import "./App.css";
import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { initialState, reducer } from "./reducer";
import MainContext from "./context/MainContext";
import Menu from "./Layout/Menu/Menu";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute";
import AddPost from "./pages/AddPost/AddPost";
import BrowsePosts from "./pages/BrowsePosts/BrowsePosts";
import UserPanel from "./pages/UserPanel/UserPanel";
import PostsList from "./pages/PostsList/PostsList";
import EditPostForm from "./pages/PostsList/EditPostForm/EditPostForm";
import EditUserDataForm from "./pages/EditUserDataForm/EditUserDataForm";
import FriednsUser from "./pages/FriednsUser/FriednsUser";
import NotFound from "./pages/404/NotFound";
import UserProfile from "./pages/UserProfile/UserProfile";
import ListInviteUser from "./pages/FriednsUser/ListInviteUser/ListInviteUser";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <Menu />
    </Header>
  );

  const content = (
    <>
      <Routes>
        <Route
          path="/paneluzytkownika/dodajpost"
          exact
          element={
            <AuthenticatedRoute>
              <AddPost />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/paneluzytkownika/listapostow"
          exact
          element={
            <AuthenticatedRoute>
              <PostsList />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/paneluzytkownika/listapostow/edytuj"
          exact
          element={
            <AuthenticatedRoute>
              <EditPostForm />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/paneluzytkownika/zmianiadanychuzytkownika"
          exact
          element={
            <AuthenticatedRoute>
              <EditUserDataForm />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/paneluzytkownika/dodajznajomych"
          exact
          element={
            <AuthenticatedRoute>
              <FriednsUser />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/paneluzytkownika"
          exact
          element={
            <AuthenticatedRoute>
              <UserPanel />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profiluzytkownika/:username"
          exact
          element={
            <AuthenticatedRoute>
              <UserProfile />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profiluzytkownika/zaproszenia/:username"
          exact
          element={
            <AuthenticatedRoute>
              <ListInviteUser />
            </AuthenticatedRoute>
          }
        />
        <Route path="/posty" exact element={<BrowsePosts />} />
        <Route path="/zaloguj" exact element={<LoginPage />} />
        <Route path="/zarejestruj" exact element={<RegisterPage />} />
        <Route path="/" exact element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );

  const footer = <Footer />;

  return (
    <Router>
      <MainContext.Provider
        value={{
          state: state,
          dispatch: dispatch,
        }}
      >
        <Layout header={header} content={content} footer={footer} />
      </MainContext.Provider>
    </Router>
  );
}

export default App;
