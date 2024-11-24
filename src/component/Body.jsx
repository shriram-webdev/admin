import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Body = ({ data, onDeleteRow, onEditRow, selectedRows, setSelectedRows }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", email: "", role: "" });

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectedRows(isChecked ? data.map((item) => item.id) : []);
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const isAllSelected = selectedRows.length === data.length && data.length > 0;

  const handleEditClick = (item) => {
    setEditRowId(item.id);
    setEditFormData({ name: item.name, email: item.email, role: item.role });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSave = () => {
    onEditRow(editRowId, editFormData);
    setEditRowId(null);
  };

  return (
    <div className="emp">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="selectAll"
                onChange={handleSelectAll}
                checked={isAllSelected}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  name={item.name}
                  onChange={() => handleRowSelect(item.id)}
                  checked={selectedRows.includes(item.id)}
                />
              </td>
              {editRowId === item.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="role"
                      value={editFormData.role}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleEditSave}>Save</button>
                    <button onClick={() => setEditRowId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <span className="icon" title="Edit" onClick={() => handleEditClick(item)}>
                      <FaRegEdit />
                    </span>
                    <span
                      className="icon delete"
                      title="Delete"
                      onClick={() => onDeleteRow(item.id)}
                    >
                      <MdDeleteOutline />
                    </span>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Body;
