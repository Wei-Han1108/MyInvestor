import React from 'react'
import { useGetWatchlistsQuery } from '../../slices/watchlistApiSlice';
const Recommend = () => {
  const { data: watchListData, isLoading, isError, error } = useGetWatchlistsQuery();

  return (
    <div>
      {watchListData.map((stock) => (
        <div key={stock._id}>
          <h2>{stock.name}</h2>
          <p>Price: ${stock.price}</p>
          <p>Percent Change: {stock.percentChange}%</p>
        </div>
      ))}
    </div>
  )
}

export default Recommend
