import { useState } from "react";

export function useSearchQuery() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return {
    searchQuery,
    handleSearchChange,
  };
}
