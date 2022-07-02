import { Bar,Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {useSelector} from 'react-redux';

function BarChart() {

  const items = useSelector((state) => state.covid.items);
  const countryData = useSelector((state) => state.covid.countryData);
  const changeCountry = useSelector((state) => state.covid.changeCountry);

  const covidData = [
    {
      title: "Infected",
      val: changeCountry ? countryData.confirmed.value : items && items.confirmed.value,
    },
    {
      title: "Recovered",
      val: changeCountry ? countryData.recovered.value : items && items.recovered.value,
    },
    {
      title: "Deaths",
      val: changeCountry ? countryData.deaths.value : items && items.deaths.value,
    },
    {
      title: "Active",
      val: changeCountry && countryData.confirmed.value - countryData.deaths.value || items && items.confirmed.value - items.deaths.value,
    },
  ];

  return (
    <div className="barChart">
      {changeCountry ?  <Bar data={{
          labels: covidData.map((data) => data.title),
          datasets: [
            {
              label: "Infected",
              data: covidData.map((data) => (data.val)),
              backgroundColor: [
                "#b3e5fc",
                "#b2dfdb",
                "#f8bbd0",
                "#ffecb3",
                "#2a71d0",
              ],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        }} /> : <Line data={{
          labels: covidData.map((data) => data.title),
          datasets: [
            {
              label: "Infected",
              data: covidData.map((data) => (data.val)),
              backgroundColor: [
                "#b3e5fc",
                "#b2dfdb",
                "#f8bbd0",
                "#ffecb3",
                "#2a71d0",
              ],
              borderColor: "black",
              borderWidth: 1,
            },
          ],
        }} />}
        
    </div>
  )
}

export default BarChart;