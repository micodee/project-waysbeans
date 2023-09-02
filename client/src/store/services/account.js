import { waysbeansAPI } from "../waysbeansAPI";

export const AccountAPI = waysbeansAPI.injectEndpoints({
 endpoints: builder => ({

  login: builder.mutation({
   query: data => ({
    url: `/login`,
    method: 'POST',
    body: { ...data }
   }),
   transformResponse: (response, meta, arg) => response,
   invalidatesTags: [{type: 'TagAccount'}]
  }),

  register: builder.mutation({
   query: data => ({
    url: `/register`,
    method: 'POST',
    body: { ...data }
   }),
   transformResponse: (response, meta, arg) => response,
   invalidatesTags: [{type: 'TagAccount'}]
  }),

 })
})

export const { useLoginMutation, useRegisterMutation } = AccountAPI