import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

const CountrySchema = z.object({
  name: z.string(),
  region: z.string(),
  flag: z.string(),
  independent: z.boolean().optional(),
});

const CountryArraySchema = z.array(CountrySchema);

export type Country = z.infer<typeof CountrySchema>;
export type CountryArray = z.infer<typeof CountryArraySchema>;

export const countryApi = createApi({
  reducerPath: "countryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v2/" }),
  endpoints: (builder) => ({
    getAllCountries: builder.query<CountryArray, void>({
      query: () => "all?fields=name,region,flag",
      transformResponse: (response: unknown) => {
        const validatedData = CountryArraySchema.parse(response);
        return validatedData;
      },
    }),
    getCountryByName: builder.query<CountryArray, string>({
      query: (name) => `name/${name}?fields=name,region,flag`,
      transformResponse: (response: unknown) => {
        const validatedData = CountryArraySchema.parse(response);
        return validatedData;
      },
    }),
    getCountriesByRegion: builder.query<CountryArray, string>({
      query: (region) => `region/${region}?fields=name,region,flag`,
      transformResponse: (response: unknown) => {
        const validatedData = CountryArraySchema.parse(response);
        return validatedData;
      },
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useGetCountryByNameQuery,
  useGetCountriesByRegionQuery,
} = countryApi;
