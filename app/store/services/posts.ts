import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StorageService } from '../../services/storage';

const API_BASE_URL = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async headers => {
      const token = await StorageService.getAccessToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query<Post, number>({
      query: id => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: body => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation<void, number>({
      query: id => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
