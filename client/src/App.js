import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./users/Admin";
import User from "./users/Users";
import UserLogin from "./users/UserLogin";
import NavbarAdmin from "./users/header/NavbarAdmin";
import AllUsers from "./users/AllUsers";
import BookingForm from "./users/BookingForm";
import Home from "./users/Home";

function App() {
  return (
    <div className="bg-primary-subtle pb-lg-5 pb-3 position-relative h-100">
      <BrowserRouter>
        <NavbarAdmin />
        <Routes>
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path={`/booking/:userId`} element={<BookingForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
