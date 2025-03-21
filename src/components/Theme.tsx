import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "contained", color: "primary" },
              style: {
                border: `4px dashed ${red[500]}`,
              },
            },
          ],
        },
      },
    },
  },
});
