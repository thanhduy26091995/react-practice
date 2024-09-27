import { useState } from "react";
import useBookStore from "./bookStore";
import "../App.css";

export default function BookForm() {
  const addBook = useBookStore((state) => state.addBook);
  const [bookDetails, setBookDetails] = useState({});

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  function handleAddBook() {
    if (!Object.keys(bookDetails).length) {
      return alert("Please enter book details!");
    }
    addBook(bookDetails);
  }

  return (
    <div className="input-container">
      <div className="input-grp">
        <label className="font-medium">Book ID</label>
        <input
          className="mt-1"
          type="text"
          name="id"
          size={50}
          onChange={handleOnChange}
        ></input>
      </div>

      <div className="input-container">
        <label className="font-medium">Book Name</label>
        <input
          type="text"
          name="name"
          size={50}
          onChange={handleOnChange}
        ></input>
      </div>

      <div className="input-container">
        <label className="font-medium mt-2 ml-2">Author</label>
        <input
          type="text"
          name="author"
          size={50}
          onChange={(e) => handleOnChange(e)}
        ></input>
      </div>

      <button onClick={() => handleAddBook()} className="add-btn">
        {" "}
        Add{" "}
      </button>
    </div>
  );
}
