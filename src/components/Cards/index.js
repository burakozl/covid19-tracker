import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCovidConfirmedData } from "../../redux/covidSlice";
import * as moment from 'moment';
import CountUp from 'react-countup';
import Error from '../Error';
import Loading from '../Loading';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { lightBlue, teal, pink, amber } from "@mui/material/colors";

export default function OutlinedCard() {
   
   const dispatch = useDispatch();

   const status = useSelector((state) => state.covid.status);
   const items = useSelector((state) => state.covid.items);
   const error = useSelector((state) => state.covid.error);
   const countryData = useSelector((state) => state.covid.countryData);
   const changeCountry = useSelector((state) => state.covid.changeCountry);
   const updateDate =moment(items.lastUpdate).format('ddd MMM DD YYYY, hh:mm:ss a');

   useEffect(() => {
    if(status === 'idle'){
      dispatch(fetchCovidConfirmedData());
    }

  },[dispatch]);

  if(status === 'failed'){
    return <Error message={error}/>
  }
  

  const cardValues = [
    {
      title: "Infected",
      val: changeCountry ? countryData.confirmed.value : items && items.confirmed.value,
      date: items && updateDate,
      color: lightBlue["100"],
      bgbox: lightBlue["800"],
    },
    {
      title: "Recovered",
      val: changeCountry ? countryData.recovered.value : items && items.recovered.value,
      date: items && updateDate,
      color: teal["100"],
      bgbox: teal["800"],
    },
    {
      title: "Deaths",
      val: changeCountry ? countryData.deaths.value : items && items.deaths.value,
      date: items && updateDate,
      color: pink["100"],
      bgbox: pink["800"],
    },
    {
      title: "Active",
      val: changeCountry && countryData.confirmed.value - countryData.deaths.value || items && items.confirmed.value - items.deaths.value,
      date: items && updateDate,
      color: amber["100"],
      bgbox: amber["800"],
    },
  ];

  return (
    <div className="cards">
      {status === 'loading' && <Loading />}
      {cardValues?.map((item, index) => (
        <Box key={index} sx={{ bgcolor: item.bgbox }} borderRadius="5%">
          <Card variant="outlined" sx={{ bgcolor: item.color }}>
            <>
              <CardContent>
                <Typography
                  sx={{ fontSize: "1.5em" }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.title}
                </Typography>
                <Typography variant="h5" component="div">
                  <CountUp end={item.val} />
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <span>
                    <b>Last Updated at:</b><br/>
                  </span>
                  <span>{item.date}</span>
                </Typography>
                <Typography variant="body2">
                  Number of {item.title.toLowerCase()} cases of COVID-19
                </Typography>
              </CardContent>
            </>
          </Card>
        </Box>
      ))}
    </div>
  );
}