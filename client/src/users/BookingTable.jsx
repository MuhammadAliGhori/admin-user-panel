import React from "react";

function BookingTable({
  bookings,
  users,
  handleDelete,
  setEditingBookingId,
  correctAdminKey,
}) {
  return (
    <div className="w-100 px-0 py-3">
      <table className="table table-large table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">From Country</th>
            <th scope="col">To Country</th>
            <th scope="col">Description</th>
            <th scope="col">From Date</th>
            <th scope="col">To Date</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index}</td>
              <td>{booking.name}</td>
              <td>{booking.fromCountry}</td>
              <td>{booking.toCountry}</td>
              <td className="truncate-10-words">{booking.description}</td>
              <td>{new Date(booking.fromDate).toDateString()}</td>
              <td>{new Date(booking.toDate).toDateString()}</td>
              <td>{booking.category}</td>
              <td>{booking.status}</td>
              <td>
                {users.some((user) => user._id) &&
                correctAdminKey === booking.adminKey ? (
                  <div>
                    <button
                      className="custom-btn btn-9 border-0 mx-2"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="custom-btn btn-9 border-0"
                      onClick={() => setEditingBookingId(booking._id)}
                    >
                      Edit
                    </button>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingTable;
