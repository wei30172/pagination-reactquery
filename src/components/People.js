import React, { useState } from 'react'
import Person from './Person.js';
import { useQuery } from "react-query";

const fetchPeople = async ({queryKey}) => {
  const { page } = queryKey[1];
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
}
const People = () => {
  const [page, setPage] = useState(1);
  const { status, data } = useQuery(["peolpe", {page}], fetchPeople, {
    keepPreviousData: true,
  });
  return (
    <div>
      <h2>People</h2>
      {status === 'loading' && (
        <div>Loading...</div>
      )}
      {status === 'error' && (
        <div>An error has occurred</div>
      )}
      {status === 'success' && (
        <div>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >Previous</button>
          <span>page: { page }</span>
          <button
            onClick={() => setPage(prev => (!data.next ? prev : prev + 1))}
            disabled={!data.next}
          >Next</button>
          { data.results.map(person => <Person key={person.name} person={person} />) }
        </div>
      )}
    </div>
  );
}
 
export default People;