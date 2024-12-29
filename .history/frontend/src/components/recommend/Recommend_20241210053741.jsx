import React from 'react'
import { useGetWatchlistsQuery } from '../../slices/watchlistApiSlice';
const Recommend = () => {
  const { data: watchListData, isLoading, isError, error } = useGetWatchlistsQuery();
  console.log(error.message);
  return (
    <>
    
    </>
    
  )
}

export default Recommend
