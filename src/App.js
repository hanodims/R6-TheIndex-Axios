import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

const App = () => {

  const [authors, setAuthor] = useState([]);//set all authors
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  //to get all authors
  const getAuthors = async () => {
    try {
      const response = await axios.get("https://the-index-api.herokuapp.com/api/authors/");
      setAuthor(response.data);
      setLoading(false)
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

    //to get one author details
    const getCurrentAuthor = async (author) => {
      console.log(author)
      setLoading(true)
      try {
        const response = await axios.get(`https://the-index-api.herokuapp.com/api/authors/${author.id}/`);
        setCurrentAuthor(response.data);
        setLoading(false)
      }
      catch (error) {
        console.log("wrong...");
        console.error(error);
      }
    };


  const selectAuthor = author => getCurrentAuthor(author);

  const unselectAuthor = () => setCurrentAuthor(null);

  const getContentView = () => {
    //loading
    if (loading==false) {
    if (currentAuthor) {
      return <AuthorDetail author={currentAuthor} />;
    } else {
      return <AuthorList authors={authors} selectAuthor={selectAuthor} />;
    }} else {
      return <div>Loading...</div>

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
