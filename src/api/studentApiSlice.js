import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApiUrl = 'https://664af9c2a300e8795d43ae2e.mockapi.io/students';

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    fetchStudents: builder.query({
      query: () => '',
      providesTags: ['Student'],
    }),
    fetchStudent: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: '',
        method: 'POST',
        body: student,
      }),
      invalidatesTags: ['Student'],
    }),
    updateStudent: builder.mutation({
      query: ({ id, student }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: student,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const {
  useFetchStudentsQuery,
  useFetchStudentQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;