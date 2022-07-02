import { useState,useEffect } from 'react';
import Error from '../Error';
import Loading from '../Loading';
import { FormControl,InputLabel, NativeSelect } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCovidConfirmedData,fetchCovidCountriesNames,fetchCovidCountries } from '../../redux/covidSlice';


function Counturies() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const dispatch = useDispatch();

  const countries = useSelector((state) => state.covid.countries);
  const statusCountryNames = useSelector((state) => state.covid.statusCountryNames);
  const changeCountry = useSelector((state) => state.covid.changeCountry);
  const error = useSelector((state) => state.covid.error);

  useEffect(() => {
    if(statusCountryNames === 'idle')
    dispatch(fetchCovidCountriesNames());
  },[dispatch]);
  if(statusCountryNames === 'failed'){
    return <Error message={error}/>
  }

  const handleChange = (e) => {
    const iso2 = e.target.value;
    if(iso2 === 'global'){
      setSelectedCountry(iso2);
      dispatch(fetchCovidConfirmedData());
    }else{
      const countryName = countries.find((country) => country.iso2 === iso2).name;
      setSelectedCountry(iso2);
      dispatch(fetchCovidCountries(countryName));
    }
    
  };
  return (
    <div className='counturies'>
       {statusCountryNames === 'loading' && <Loading />}
        <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Counturies
                </InputLabel>
                <NativeSelect
                    value={selectedCountry}
                    onChange={handleChange}
                >
                  <option value="global">Global</option>
                  {countries?.map((country, index) => (
                    <option key={index} value={country.iso2}>{country.name}</option> 
                  ))}
                </NativeSelect>
        </FormControl>
    </div>
  )
}

export default Counturies
