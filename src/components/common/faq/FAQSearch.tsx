"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import {  useState } from "react";
import FAQListItems from "@/data/faq.json";

const FAQSearch = () => {
  const { faqState, setFAQState } = useAppContext();
  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   console.log({ FAQListItems });
  //   setFAQState()
  // }, []);

  const handleSearch = () => {
    setFAQState((prev) => ({ ...prev, searchQuery: query, isLoading: true }));
    setTimeout(() => {
      setFAQState((prev) => ({ ...prev, isLoading: false })); // Simulate search results
    }, 1000);
  };

  return (
    <div className="p-4">
      <div className=" flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search FAQs..."
          className="border rounded p-2 w-full"
        />
        <Button
          onClick={handleSearch}
          className=" bg-green-600 text-white rounded h-full"
        >
          Search
        </Button>
      </div>
      {faqState.isLoading && <p>Loading...</p>}
      {faqState.results.length > 0 ? (
        <>Result</>
      ) : (
        <>
          {FAQListItems?.map((faq) => (
            <div key={faq.id}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FAQSearch;
