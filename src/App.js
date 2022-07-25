import { useState, useEffect } from "react";
import { container } from "react";
import axios from "axios";

export default function App() {
  const [data, setdata] = useState({ hits: [] });
  const [query, setquery] = useState("");
  const [url, seturl] = useState(
    "https://hn.algolia.com/api/v1/search?query=india"
  );

  useEffect(() => {
    const fetchdata = async () => {
      let result = await axios(url);
      setdata(result.data);
    };
    fetchdata();
  }, [url]);
  console.log(data);

  return (
    <container class="form">
      <form
        onSubmit={(e) => {
          seturl(`https://hn.algolia.com/api/v1/search?query=${query}`);
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <button>search</button>
      </form>

      <ul>
        {data.hits.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </container>
  );
}
