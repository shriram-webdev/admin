import React, { useEffect, useState } from "react";
import axios from "axios";
import Body from "./component/Body";
import Pagination from "./component/Pagination";

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((res) => setData(res.data));
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleDeleteRow = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleDeleteSelected = () => {
    setData(data.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const handleEditRow = (id, updatedRow) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, ...updatedRow } : item
    );
    setData(updatedData);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="main">
      <input
        className="searchbox"
        value={searchTerm}
        type="text"
        placeholder="Search by name, email, role"
        onChange={handleSearchChange}
      />
      {filteredData.length > 0 ? (
        <>
          <Body
            data={currentPosts}
            onDeleteRow={handleDeleteRow}
            onEditRow={handleEditRow}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
          <Pagination
            totalPosts={filteredData.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handleDeleteSelected={handleDeleteSelected}
          />
        </>
      ) : (
        <h5 className="errmsg">{searchTerm} Not found 🤖</h5>
      )}
    </div>
  );
};

export default App;
