import React from 'react'
import { useGetWatchlistsQuery } from '../../slices/watchlistApiSlice';
const Recommend = () => {
  const { data: watchListData, isLoading, isError, error } = useGetWatchlistsQuery();
  console.log(watchListData);
  return (
    <>
    
    </>
    
  )
}

export default Recommend
