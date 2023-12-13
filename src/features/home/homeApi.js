import { apiSlice } from "../api/apiSlice";

const homeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFeatures: builder.query({
            query: () => ({
                url: "/features"
            }),
        }),

        getReviews: builder.query({
            query: () => ({
                url: "/reviews"
            }),
        }),
    }),
})

export const { useGetFeaturesQuery, useGetReviewsQuery } = homeApi;