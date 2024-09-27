import { useEffect } from "react";
import useBookStore from "./bookStore";
import BookForm from "./BookForm";
import BookList from "./BookList";
import "../App.css";

export default function BookStoreApp() {
  const reset = useBookStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="App max-w-sm px-4 py-4">
      <h2 className="font-bold">My Library Store</h2>
      <BookForm />
      <BookList />
    </div>
  );
}
