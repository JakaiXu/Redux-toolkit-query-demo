import { faker } from "@faker-js/faker";
import { createApi } from "@reduxjs/toolkit/query/react";
// import {  fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
interface DataProps {
  id: number;
}
interface ClientBody {
  clientId: number;
  title: string;
}
interface ParamsProps {
  url: string;
  params?: { clientId: DataProps };
  method: string;
  body?: ClientBody;
}
const axiosBaseQuery = ({ baseUrl }: { baseUrl: string }) => {
  return ({ url, method, params, body }: ParamsProps) => {
    return axios({
      url: baseUrl + url,
      method,
      params,
      data: body,
    });
  };
};
export const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:3005/",
  }),
  tagTypes: ["Album"],
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags:
          //  ["Album"],
          (result, error, client) => {
            return [{ type: "Album", id: client.id, },'Album'];
          },
        query: (client) => {
          return {
            url: "albums",
            params: {
              clientId: client.id,
            },
            method: "GET",
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags:
          // ["Album"],
          (result, error, client) => {
            return [{ type: "Album", id: client.id }];
          },
        query: (client) => {
          return {
            url: "albums",
            body: { clientId: client.id, title: faker.commerce.productName() },
            method: "POST",
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags:
          // ["Album"],
          (result, error, album) => {
            return [{ type: "Album", id: album.id },"Album"];
          },
        query: (album) => {
          return {
            url: `albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
