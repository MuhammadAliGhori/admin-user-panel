import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./users/Admin";
import User from "./users/Users";
import UserLogin from "./users/UserLogin";
import NavbarAdmin from "./users/header/NavbarAdmin";
import AllUsers from "./users/AllUsers";
import BookingForm from "./users/BookingForm";
import UserPannel from "./users/UserPannel";
import AdminPannel from "./users/AdminPannel";

function App() {
  return (
    <div className="bg-primary-subtle pb-lg-5 pb-3 position-relative h-100">
      <BrowserRouter>
        <NavbarAdmin />
        <Routes>
          <Route exact path="/admin" element={<Admin />} />
          <Route path="/adminpanel" element={<AdminPannel />} />
          <Route exact path="/" element={<UserPannel />} />
          <Route path="/createuser" element={<User />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path={`/booking`} element={<BookingForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
