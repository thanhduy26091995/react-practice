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
    <div className="App max-w-sm px-8">
      <h2 className="mx-8 text-white">My Library Store</h2>
      <BookForm />
      <BookList />
      <>
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
          <div className="shrink-0">
            <img
              className="size-12"
              src="../assets/react.svg"
              alt="ChitChat Logo"
            />
          </div>
          <div>
            <div className="text-xl font-medium text-black">ChitChat</div>
            <p className="text-slate-500">You have a new message!</p>
          </div>
        </div>
      </>
    </div>
  );
}
