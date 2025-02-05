"use client";

import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      continent {
        name
      }
    }
  }
`;

export default function Countries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [search, setSearch] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  let filteredCountries = data?.countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  if (selectedContinent) {
    filteredCountries = filteredCountries.filter(
      (country) => country.continent.name === selectedContinent
    );
  }

  if (selectedCountry) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">{selectedCountry.name}</h2>
        <p>Continent: {selectedCountry.continent.name}</p>
        <button onClick={() => setSelectedCountry(null)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Go Back
        </button>
      </div>
    );
  }

  const continents = [...new Set(data?.countries.map((c) => c.continent.name) || [])];

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-2/3 p-3 border border-gray-300 rounded-lg shadow-sm 
        focus:ring-2 focus:ring-blue-500 focus:border-transparent
        text-gray-900 placeholder-gray-500
        bg-white"
      />

      <select
        className="mb-4 mr-2w-full md:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm
        focus:ring-2 focus:ring-blue-500 focus:border-transparent
        text-gray-900 bg-white"
        value={selectedContinent}
        onChange={(e) => setSelectedContinent(e.target.value)}
      >
        <option value="">All Continents</option>
        {continents.map((continent) => (
          <option key={continent} value={continent}>
            {continent}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-4">
        {filteredCountries.map((country) => (
          <div
            key={country.code}
            className="p-4 cursor-pointer border rounded shadow hover:bg-gray-100/10"
            onClick={() => setSelectedCountry(country)}
          >
            <h3 className="text-lg font-semibold">{country.name}</h3>
            <p>{country.continent.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
