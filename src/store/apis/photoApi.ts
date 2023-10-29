import { createApi, } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import axios from "axios";

interface DataProps {
  id: number;
}
interface AlbumBody {
  albumId: number;
  url: string;
}
interface ParamsProps {
  url: string;
  params?: { albumId: DataProps };
  method: string;
  body?: AlbumBody;
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

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:3005/",
  }),
  tagTypes: ["Photo"],
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          return [{ type: "Photo", id: album.id },'Photo'];
        },
        query: (album) => {
          return {
            url: "photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "Photo", id: album.id }];
        },
        query: (album) => {
          return {
            url: "photos",
            body: {
              albumId: album.id,
              url: faker.image.url(),
            },
            method: "POST",
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: "Photo", id: photo.id },'Photo'];
        },
        query: (photo) => {
          return {
            url: `photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };
