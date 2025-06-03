import { useState } from 'react';

interface SearchAndSortProps {
  search: string;
  setSearch: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}
//search and sort
export default function SearchAndSort({ search, setSearch, sort, setSort }: SearchAndSortProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <input
        type="text"
        placeholder="Search after games..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="year-asc">Year (oldest)</option>
        <option value="year-desc">Year (newest)</option>
      </select>
    </div>
  );
} 