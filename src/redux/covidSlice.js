import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCovidConfirmedData = createAsyncThunk('covid/getCovid',async() => {
    const res = await axios (`${process.env.REACT_APP_API_BASE_ENDPOINT}/`);
    return res.data;
});

export const fetchCovidCountriesNames = createAsyncThunk('countriesData/getCountriesNames',async() => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/countries`);
    return res.data.countries;
});

export const fetchCovidCountries = createAsyncThunk('countriesData/getCovidCountries',async(country) => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/countries/${country}`);
    return res.data;
});

export const covidSlice = createSlice({
    name: 'covid',
    initialState: {
        items: "",
        status: 'idle',
        statusCountryNames: 'idle',
        statusCountries: 'idle',
        countries: [],
        countryData: "",
        changeCountry: false,
    },
    reducers: {},
    extraReducers: {
        [fetchCovidConfirmedData.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchCovidConfirmedData.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.countryData = action.payload;
            state.status = "successed";
            state.changeCountry = false;
          },
        [fetchCovidConfirmedData.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        //fetchCovidCountriesNames 
        [fetchCovidCountriesNames.pending]: (state) => {
            state.statusCountryNames = 'loading';
        },
        [fetchCovidCountriesNames.fulfilled]: (state, action) => {
            state.countries = action.payload;
            state.statusCountryNames = "successed";
          },
        [fetchCovidCountriesNames.rejected]: (state, action) => {
            state.statusCountryNames = "failed";
            state.error = action.error.message;
        },
        ////fetchCovidCountries 
        [fetchCovidCountries.pending]: (state) => {
            state.statusCountries = 'loading';
        },
        [fetchCovidCountries.fulfilled]: (state, action) => {
            state.countryData = action.payload;
            state.statusCountries = "successed";
            state.changeCountry = true;
          },
        [fetchCovidCountries.rejected]: (state, action) => {
            state.statusCountries = "failed";
            state.error = action.error.message;
        },
    },
});

export default covidSlice.reducer;