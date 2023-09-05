import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const waysbeansAPI = createApi({
 reducePath: 'waysbeans',
 baseQuery: fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
 }),
 endpoints: () => ({}),
 overrideExisting: true,
 tagTypes: [
  'TagProducts',
  'TagAccount'
 ]
})