import React, { useMemo, useState } from "react";
import { useTable, useFilters } from "react-table";

const Table = ({
  data,
  handleEdit,
  handleDelete,
  setEditingBookingId,
  users,
}) => {
  const staticCategories = ["Education", "Engineering", "Medical"];

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "From Country",
        accessor: "fromCountry",
      },
      {
        Header: "To Country",
        accessor: "toCountry",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "From Date",
        accessor: "fromDate",
        Cell: ({ value }) => {
          const formattedDate = value
            ? new Date(value).toLocaleDateString()
            : "";
          return <div>{formattedDate}</div>;
        },
      },
      {
        Header: "To Date",
        accessor: "toDate",
        Cell: ({ value }) => {
          const formattedDate = value
            ? new Date(value).toLocaleDateString()
            : "";
          return <div>{formattedDate}</div>;
        },
      },
      {
        Header: "Category",
        accessor: "category",
      },
      //   {
      //     Header: "Status",
      //     accessor: "status",
      //   },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div>
            <button
              className="custom-btn btn-9 border-0 mx-2"
              onClick={() => handleLeadSelection(row.original)}
            >
              Select
            </button>
            <button
              className="custom-btn btn-9 border-0"
              onClick={() => setEditingBookingId(row.original._id)}
            >
              Edit
            </button>
            <button
              className="custom-btn btn-9 border-0 mx-2"
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const [selectedLead, setSelectedLead] = useState([]);
  const [assignedUser, setAssignedUser] = useState("");
  const [assignedInfo, setAssignedInfo] = useState({
    user: "",
    numberOfLeads: 0,
  });

  const handleLeadSelection = (leadData) => {
    setSelectedLead((prevSelectedLead) => {
      const leadExists = prevSelectedLead.some(
        (lead) => lead._id === leadData._id
      );

      if (leadExists) {
        return prevSelectedLead.filter((lead) => lead._id !== leadData._id);
      } else {
        return [...prevSelectedLead, leadData];
      }
    });
  };

  console.log(selectedLead, "ali");
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters
  );

  const handleFilterChange = (columnId, value) => {
    setFilter(columnId, value);
  };

  const handleAssign = () => {
    console.log("Selected Leads:", selectedLead);
    console.log("Assigned User:", assignedUser);
    setAssignedInfo({ user: assignedUser, numberOfLeads: selectedLead.length });
    setSelectedLead([]);
    setAssignedUser("");
  };
  const getAssignedUserName = () => {
    if (assignedInfo.user) {
      const assignedUserObject = users.find(
        (user) => user._id === assignedInfo.user
      );
      return assignedUserObject ? assignedUserObject.name : "Unknown User";
    }
    return "";
  };
  return (
    <div>
      {/* <input
        value={state.filters[0]?.value || ""}
        onChange={(e) => handleFilterChange("category", e.target.value)}
        placeholder="Filter by Category"
      /> */}
      <select
        value={state.filters[0]?.value || ""}
        onChange={(e) => handleFilterChange("category", e.target.value)}
        className="w-25"
      >
        <option value="">All Categories</option>
        {staticCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        className="w-25 mx-2"
        value={assignedUser}
        onChange={(e) => setAssignedUser(e.target.value)}
      >
        <option value="">Assign User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} - {user.category}
          </option>
        ))}
      </select>
      <button
        className="custom-btn btn-9 border-0 m-2"
        onClick={handleAssign}
        disabled={selectedLead.length === 0 || assignedUser === ""}
      >
        Assigned
      </button>
      <table
        {...getTableProps()}
        className="table table-bordered table-striped"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {/* these are all leads */}
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {assignedInfo.user && (
          <div>
            <p>Assigned to: {getAssignedUserName()}</p>
            <p>Number of Leads Assigned: {assignedInfo.numberOfLeads}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
