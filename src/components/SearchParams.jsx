import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchParams() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ q: searchQuery });
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    const fetchapi = async () => {
      const url = `https://real-time-product-search.p.rapidapi.com/search?q=${encodeURIComponent(
        searchQuery
      )}&country=us&language=en&limit=10&sort_by=BEST_MATCH&product_condition=ANY&min_rating=ANY`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "45089f1eaamsh3927fc717b7e346p1adc63jsn24daf6ccffda",
          "x-rapidapi-host": "real-time-product-search.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const { data } = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchapi();
  }, [searchParams]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {products?.map((item) => (
        <div key={item.product_id}>{item.product_title}</div>
      ))}
    </div>
  );
}
