import React, { useState } from 'react'
import Planet from './Planet';
import { useQuery } from "react-query";

const fetchPlanets = async ({queryKey}) => {
  const { page } = queryKey[1];
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
}
const Planets = () => {
  const [page, setPage] = useState(1);
  const { status, data } = useQuery(["planets", {page}], fetchPlanets, {
    keepPreviousData: true,
  });
  return (
    <div>
      <h2>Planets</h2>
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
          { data.results.map(planet => <Planet key={planet.name} planet={planet} />) }
        </div>
      )}
    </div>
  );
}
 
export default Planets;