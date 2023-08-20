import Cart from "./Pages/Cart";
import Header from "./Pages/Header";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.js";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import FixedButton from "./Pages/Components/FixedButton";
import Orders from "./Pages/Orders";
import Footer from "./Pages/Footer";
import SearchHistory from "./Pages/SearchHistory";
import SnackbarHandler from "./Pages/Components/SnackbarHandler";


function App() {
  const [, dispatch] = useStateValue();

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });


  useEffect(() => {
    //Will only rum once the app component loads
    auth.onAuthStateChanged((authUser) => {
      //console.log("The user is : ", authUser);

      if (authUser) {
        //The user was Logged In / The user just Logged In

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //The user was logged out
        //navigate('/login');
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  const handleSignOut = () => {
    setSnackbarState({
      open: true,
      message: "Signed out successfully",
      severity: "success",
    });
    setTimeout(() => {
      setSnackbarState(prevState => ({
        ...prevState,
        open: false,
      }));
    }, 2000);
  }

  const handleSnackbarClose = () => {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  };



  const handleSearch = () => {
    setSnackbarState({
      open: true,
      message: "Item added to search history successfully",
      severity: "success",
    });
    setTimeout(() => {
      setSnackbarState(prevState => ({
        ...prevState,
        open: false,
      }));
    }, 2000);
  }



  return (
    <><SnackbarHandler
      open={snackbarState.open}
      message={snackbarState.message}
      severity={snackbarState.severity}
      handleClose={handleSnackbarClose}
    />
      <Router>
        <div className="app">
          <Routes>

            <Route
              path="/orders"
              element={
                <>
                  <Header onSignOut={handleSignOut} />
                  <FixedButton />
                  <Orders />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cart"
              element={
                <>
                  <Header onSignOut={handleSignOut} onSearch={handleSearch} />
                  <FixedButton />
                  <Cart />
                </>
              }
            ></Route>

            <Route
              path="/history"
              element={
                <>
                  <Header onSignOut={handleSignOut} onSearch={handleSearch} />
                  <FixedButton />
                  <SearchHistory />
                </>
              }
            />


            <Route
              path="/"
              element={
                <>
                  <Header onSignOut={handleSignOut} onSearch={handleSearch} />
                  <Home />
                  <FixedButton />
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router></>
  );
}

export default App;