import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../custom.css";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getAdminKey } from "../../bookingUtils";

function NavbarAdmin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState([]);
  const correctAdminKey = process.env.BOOKING_FORM_KEY;
  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getallusers"
        );
        if (response.status === 200) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);

  const handleUserClick = (userId) => {
    console.log(userId);
    navigate(`/booking/${userId}`);
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between px-5 bg-info-subtle ">
        
        <div className="">
          <Link to="/" className="px-3 text-decoration-none text-dark fw-bold">
           User Pannel
          </Link>
          {correctAdminKey === getAdminKey ? (
            <Link
              to="/admin"
              className="px-3 text-decoration-none text-dark fw-bold"
            >
              Admin
            </Link>
          ) : (
            <Link
              to="/admin"
              className="px-3 text-decoration-none text-dark fw-bold"
            >
              Admin
            </Link>
          )}
          
    
          <Link
            to="/userlogin"
            className="px-3 text-decoration-none text-dark fw-bold"
          >
            Login
          </Link>
          <Link
            to="/booking"
            className="px-3 text-decoration-none text-dark fw-bold"
          >
            Consumers
          </Link>
        </div>
        <button
          className="m-3 custom-btn btn-9 text-decoration-none  fw-bold"
          onClick={handleShow}
        >
          Users
        </button>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>All Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Dropdown>
            <Dropdown.Toggle
              className="w-100 text-start custom-btn btn-9"
            
              id="dropdown-basic"
            >
              Users List
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {users.map((user) => (
                <Dropdown.Item
                  key={user._id}
                  onClick={() => handleUserClick(user._id)}
                >
                  {user.name} - {user.email} - {user.category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarAdmin;
