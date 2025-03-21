import { Paper } from "@mui/material";

interface techListClass {
  TechName: string;
}

interface props {
  value: techListClass[];
}

const PaperComponent = ({ value }: props) => {
  return (
    <Paper elevation={16} square={false} sx={{ backgroundColor: "#5381ff" }}>
      <ul>
        {value.map((item, index) => (
          <li key={index}>{item.TechName}</li>
        ))}
      </ul>
    </Paper>
  );
};

export default PaperComponent;
