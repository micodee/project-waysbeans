import { waysbeansAPI } from "../waysbeansAPI";

export const ProductsAPI = waysbeansAPI.injectEndpoints({
  endpoints: builder => ({
    getProduct: builder.query({
      query: () => ({
        url: `/products`,
        method: "GET",
        providesTags: ['TagProducts'],
      }),
      transformResponse: (response, meta, arg) => response.data || []
    })
  })
});

export const { useGetProductQuery } = ProductsAPI;
