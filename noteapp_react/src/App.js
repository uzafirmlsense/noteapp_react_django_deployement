import Home from "./components/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes, redirect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import Navbar from "./components/Navbar";

function App() {
  const client_id =
    "59866668171-ovrvhrn6jtcr3g9kklfrev82okl960f0.apps.googleusercontent.com";


  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId:client_id,
        scope:""
      })
    };

    gapi.load('client:auth2',start);
  });
  // function handleCallbackResponse(response){
  //   console.log("Encoded JWT ID token: " + response.credential);
  // }

  // useEffect(()=>{
  //   google.accounts.id.initialize({
  //     client_id: "59866668171-ovrvhrn6jtcr3g9kklfrev82okl960f0.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     {theme:"outline", size: "large"}
  //   )
  // },[]);

  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
