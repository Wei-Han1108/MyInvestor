import React from 'react'
import { useGetWatchlistsQuery } from '../../slices/watchlistApiSlice';
import Loader from '../loader/Loader';
import Message from '../message/Message';
const Recommend = () => {
  const { data: watchListData, isLoading, isError, error } = useGetWatchlistsQuery();
  console.log(watchListData);
  return (
    <>
    
    </>
    
  )
}

export default Recommend
