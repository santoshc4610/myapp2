import { BarChart } from "@mui/x-charts/BarChart";
import { DatasetType } from "@mui/x-charts/internals";
//import { dataset, valueFormatter } from "../dataset/weather";
interface props {
  barChartDataSet: DatasetType;
}

const chartSetting = {
  yAxis: [
    {
      label: "Volume",
    },
  ],
  width: 400,
  height: 200,
};

export default function BarsDataset({ barChartDataSet }: props) {
  console.log(barChartDataSet);
  return (
    <>
      <BarChart
        dataset={barChartDataSet}
        xAxis={[{ scaleType: "band", dataKey: "GROUPNO" }]}
        series={[
          {
            dataKey: "BOOKINGREQUEST",
            label: "Booking Request",
            stack: "module",
          },
          {
            dataKey: "BOOKINGRESPONSE",
            label: "Booking Response",
            stack: "module",
          },
          {
            dataKey: "CBISACCOUNTDATA",
            label: "Account Master",
            stack: "module",
          },
          { dataKey: "CBISTRIGGER", label: "Cbis Trigger", stack: "module" },
        ]}
        {...chartSetting}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      ></BarChart>
    </>
  );
}
