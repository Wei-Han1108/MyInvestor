import { WATCHLISTS_URL } from "../constants";
import { STORAGES_URL } from "../constants";
import { apiSlice } from "./apiSlices";
import { USERS_URL } from "../constants";
import { STORAGES_DETAIL_URL } from "../constants";
export const watchlistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWatchlists: builder.query({
            query: () => ({
                url: WATCHLISTS_URL,
            }),
            providesTags: ['Watchlist'],
            keepUnusedDataFor: 5
        }),  
        getStorages: builder.query({
            query: () => ({
                url: STORAGES_URL,
            }),
            providesTags: ['Storage'],
            keepUnusedDataFor: 5
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5
        }),
        getStoragesDetail: builder.query({
            query: (id) => ({
                url: STORAGES_DETAIL_URL(id),
            }),
            providesTags: ['Storage'],
            keepUnusedDataFor: 5
        }),
    }),
})

export const { useGetWatchlistsQuery, useGetStoragesQuery, useGetUsersQuery, useLazyGetStoragesDetailQuery } = watchlistApiSlice
