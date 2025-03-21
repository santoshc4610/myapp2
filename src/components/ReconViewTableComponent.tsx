import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface ReconDetails {
  RequestTmisId: string;
  RequestStatus: string;
  Transactionid: string;
  ResponseTmisId: string;
  ResponseStatus: string;
  FinalStatus: string;
}
interface props {
  reconDetails: ReconDetails[];
  headers: string[];
}

const ReconViewTableComponent = ({ reconDetails, headers }: props) => {
  return (
    <TableContainer component={Paper} style={{ padding: "20px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: "lightgrey" }}>
            {headers &&
              headers.map((header, id) => (
                <TableCell className="col-sm-2" key={id}>
                  {header}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {reconDetails.map((row, key) => (
            <TableRow
              key={key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.RequestTmisId}
              </TableCell>
              <TableCell align="right">{row.RequestStatus}</TableCell>
              <TableCell align="right">{row.Transactionid}</TableCell>
              <TableCell align="right">{row.ResponseTmisId}</TableCell>
              <TableCell align="right">{row.ResponseStatus}</TableCell>
              <TableCell align="right">{row.FinalStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReconViewTableComponent;
