import { waysbeansAPI } from "../waysbeansAPI";

export const AccountAPI = waysbeansAPI.injectEndpoints({
 endpoints: builder => ({

  checkAuth: builder.query({
   query: ({token = ''}) => ({
    url: `/check-auth`,
    method: 'GET',
    headers: {
     Authorization: `Bearer ${token}`,
    },
    providesTags: ['TagAccount'],
   }),
   transformResponse: (response, meta, arg) => response.data || []
  }),

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

export const { useCheckAuthQuery, useLoginMutation, useRegisterMutation } = AccountAPI