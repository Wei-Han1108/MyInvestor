import React from 'react'
import { useGetWatchlistsQuery } from '../../slices/watchlistApiSlice';
const Recommend = () => {
  const { data: watchListData, isLoading, isError, error } = useGetWatchlistsQuery();
  console.log(watchListData.map((stock) => stock.name));
  return (
    <>
    
    </>
    
  )
}

export default Recommend