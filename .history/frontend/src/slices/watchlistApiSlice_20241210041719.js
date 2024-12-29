import { WATCHLISTS_URL } from "../constants";
import { apiSlice } from "./apiSlices";

export const watchlistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWatchlists: builder.query({
            query: () => ({
                url: WATCHLISTS_URL,
            }),
            providesTags: ['Watchlist'],
            keepUnusedDataFor: 5
        }),  
    }),
})

export const { useGetWatchlistsQuery } = watchlistApiSlice
