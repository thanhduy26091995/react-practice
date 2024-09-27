import { useEffect, useState } from "react";
import APIClient from "./APIClient";

const apiClient = new APIClient("https://jsonplaceholder.typicode.com");

export default function AxiosApp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreatePost = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await createPost();
      setData(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // declare function to fetch data
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await apiClient.get("/users");
      return response;
    } catch (error) {
      return error;
    }
  }

  async function createPost() {
    try {
      const response = await apiClient.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: "foo",
          body: "bar",
          userId: 1,
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>API Data:</h1>
      <button onClick={handleCreatePost}>CREATE</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
