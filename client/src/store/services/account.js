import { waysbeansAPI } from "../waysbeansAPI";

export const AccountAPI = waysbeansAPI.injectEndpoints({
 endpoints: builder => ({

  checkAuth: builder.query({
   query: ({token = ''}) => {
    return {
      url: `/check-auth`,
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
      providesTags: ['TagAccount'],
    }
   },
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

  editProfile: builder.mutation({
    query: data => ({
     url: `/profile`,
     method: 'PATCH',
     body: data,
     formData: true,
     headers: {
      'Authorization': `Bearer ${localStorage.token}`,
    }
    }),
    invalidatesTags: [{type: 'TagAccount'}]
   }),

 })
})

export const { useCheckAuthQuery, useLoginMutation, useRegisterMutation, useEditProfileMutation } = AccountAPI