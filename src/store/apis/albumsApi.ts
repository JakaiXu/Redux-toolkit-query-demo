import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        query: (client) => {
          return {
            url: "/albums",
            params: {
              clientId: client.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});
export const { useFetchAlbumsQuery } = albumsApi;
