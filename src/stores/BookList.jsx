import { Fragment } from "react";
import useBookStore from "./bookStore";

export default function BookList() {
  const { books, noOfAvailable, noOfIssued, issueBook, returnBook } =
    useBookStore((state) => ({
      books: state.books,
      noOfAvailable: state.noOfAvailable,
      noOfIssued: state.noOfIssued,
      issueBook: state.issueBook,
      returnBook: state.returnBook,
    }));

  return (
    <ul className="book-list">
      {!!books?.length && (
        <span className="book-count">
          <h4>Available: {noOfAvailable}</h4>
          <h4>Issued: {noOfAvailable}</h4>
        </span>
      )}
      {books?.map((book) => {
        return (
          <Fragment key={book.id}>
            <li className="list-item">
              <span className="list-item-book">
                <span>{book.id}</span>
                <span>{book.name}</span>
                <span>{book.author}</span>
              </span>
              <div className="btn-grp">
                <button
                  className={`issue-btn ${
                    book.status === "issued" ? "disabled" : ""
                  }`}
                  disabled={book.status === "issued"}
                  onClick={() => {
                    issueBook(book.id);
                  }}
                >
                  {" "}
                  Issue{" "}
                </button>

                <button
                  className={`return-btn ${
                    book.status === "available" ? "disabled" : ""
                  }`}
                  disabled={book.status === "available"}
                  onClick={() => {
                    returnBook(book.id);
                  }}
                >
                  {" "}
                  Return{" "}
                </button>
              </div>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}
