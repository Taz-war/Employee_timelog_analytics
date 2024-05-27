import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.lightblue,
        color: theme.palette.common.black,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

function TableComponent({ headers, rows, footer }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} size='small' aria-label="simple table">
                <TableHead sx={{ bgcolor: '#edf4fc' }}>
                    <TableRow>
                        {headers.map((header, index) => (
                            <StyledTableCell key={index} align={header.align || 'left'}>
                                {header.label}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <TableCell key={colIndex} align={header.align || 'left'}>
                                    {row[header.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    <TableRow sx={{ fontWeight: 'bold' }}>
                        {footer.map((foot, index) => (
                            <TableCell key={index} align={foot.align || 'left'} sx={{ fontWeight: 'bolder' }} >
                                {foot.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
                {/* {footer && (
                    <TableFooter>
                        <TableRow sx={{fontWeight:'bold'}}>
                            {footer.map((foot, index) => (
                                <TableCell key={index} align={foot.align || 'left'}  sx={{ fontWeight: 'bolder' }} >
                                    {foot.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableFooter>
                )} */}
            </Table>
        </TableContainer>
    );
}

export default TableComponent;
