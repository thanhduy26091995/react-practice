import { useEffect } from "react";
import useBookStore from "./bookStore";
import BookForm from "./BookForm";
import BookList from "./BookList";

export default function BookStoreApp() {
  const reset = useBookStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="App">
      <h2>My Library Store</h2>
      <BookForm />
      <BookList />
    </div>
  );
}
