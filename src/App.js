import React, { useEffect, useState } from "react";
import axios from "axios";

import data from "./data.js";
// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

const App = () => {
  //to get all authors
  const getAuthors = async () => {
    try {
      const response = await axios.get("https://the-index-api.herokuapp.com/api/authors/");
      console.log(response.data);
      setAuthor(response.data);
    }
    catch (error) {
      console.log("wrong...");
      console.error(error);
    }
  };
//to call getAuthors without infinite loop
  useEffect(() => {
    console.log("Rendering");
    getAuthors();
  },[]);

  const [Authors, setAuthor] = useState([]);//set all authors
  const [currentAuthor, setCurrentAuthor] = useState(null);

  const selectAuthor = author => setCurrentAuthor(author);

  const unselectAuthor = () => setCurrentAuthor(null);

  const getContentView = () => {
    if (currentAuthor) {
      return <AuthorDetail author={currentAuthor} />;
    } else {
      return <AuthorList authors={Authors} selectAuthor={selectAuthor} />;
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar unselectAuthor={unselectAuthor} />
        </div>
        <div className="content col-10">{getContentView()}</div>
      </div>
    </div>
  );
};

export default App;
