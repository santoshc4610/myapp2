import {
  DefaultizedPieValueType,
  PieChart,
  PieItemIdentifier,
} from "@mui/x-charts";
interface pieCharInfo {
  label: string;
  value: number;
}
interface props {
  pieCharInfoState: pieCharInfo[];
  filterDatafunc: (label: string) => void;
  // selectedReconDetails: (label: string, piechart: boolean) => void;
}
const palette = ["#26a69a", "#fbc02d", "#ffa726", "#f44336"];

const handleClick = (
  _context: PieItemIdentifier,
  label: DefaultizedPieValueType,
  filterDatafunc: (label: string) => void
) => {
  filterDatafunc(label.label as string);
};

const PieChartComponent = ({ pieCharInfoState, filterDatafunc }: props) => {
  return (
    <div>
      <PieChart
        colors={palette}
        series={[
          {
            arcLabel: (item) => `${item.value}`,
            data: pieCharInfoState.map((item, index) => ({
              id: index,
              value: item.value as number,
              label: item.label as string,
            })),
            outerRadius: 80,
            cx: 80,
            cy: 100,
          },
        ]}
        width={400}
        height={200}
        onItemClick={(_event, context, label) =>
          handleClick(context, label, filterDatafunc)
        }
      ></PieChart>
    </div>
  );
};

export default PieChartComponent;
