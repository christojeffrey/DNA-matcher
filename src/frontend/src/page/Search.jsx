import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const Search = () => {
  // changing place holder text, biar keren aja
  const [placeholder, setPlaceholder] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    let validPlaceHolder = ["Search", "13 Mei 2022", "HIV", "13 Mei 2022 HIV"];
    // chose random place holder
    let random = Math.floor(Math.random() * validPlaceHolder.length);
    setPlaceholder(validPlaceHolder[random]);
  }, []);

  return (
    <div>
      <Input
        size="lg"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      mau nembak backend tiap onChange ato sekali doang? onChange ajalah ya biar keren :v
    </div>
  );
};
export default Search;
