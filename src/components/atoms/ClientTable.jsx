import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Box } from '@mui/material';
import Chip from '@mui/material/Chip';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#edf4fc',
        color: theme.palette.common.black,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    '&:last-child': {
        borderRight: 0,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const HighlightedRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: '#fff4e5',
    '& td': {
        fontWeight: 'bold',
        textAlign: 'right',
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    '& td:first-of-type': {
        textAlign: 'left',
    },

}));

const rows = [
    { taskName: 'Wolq Bulk Email', taskStatus: 'In Progress', budgetHours: '$2,776', loggedHours: '$2,776', devCost: '$1,998', breakEvent: '$1,998', actualRevenue: '$1,998' },
    { taskName: 'Billable', taskStatus: 'Total For Not Billed', budgetHours: '$489,000', loggedHours: '$489,000', devCost: '$489,000', breakEvent: '$489,000', actualRevenue: '$489,000' },
    { taskName: 'Feasibility: IW2-T6 Update Subscription Product Price', taskStatus: 'Ready to Start', budgetHours: '$5,137', loggedHours: '$5,137', devCost: '$5,137', breakEvent: '$5,137', actualRevenue: '$5,137' },
    { taskName: 'Meeting with WOLQ', taskStatus: 'Completed', budgetHours: '$8,261', loggedHours: '$8,261', devCost: '$8,261', breakEvent: '$8,261', actualRevenue: '$8,261' },
    { taskName: 'Billable', taskStatus: 'Total for bill at End of Month', budgetHours: '$489,000', loggedHours: '$489,000', devCost: '$489,000', breakEvent: '$489,000', actualRevenue: '$489,000' },
];

const TaskStatusChip = ({ status }) => {
    const getChipColor = () => {
        switch (status) {
            case 'In Progress':
                return 'warning';
            case 'Ready to Start':
                return 'info';
            case 'Completed':
                return 'success';
            default:
                return 'default';
        }
    };

    return <Chip label={status} color={getChipColor()} />;
};

export default function ClientTable() {
    return (
        <>
            <Typography variant="h6" sx={{ m:2,ml:1 }}>
                WOLQ Email
            </Typography>
            <TableContainer  sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 700 }} size='small' aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Task Name</StyledTableCell>
                            <StyledTableCell>Task Status</StyledTableCell>
                            <StyledTableCell>Budget Hours</StyledTableCell>
                            <StyledTableCell>Logged Hours</StyledTableCell>
                            <StyledTableCell>Dev Cost</StyledTableCell>
                            <StyledTableCell>Break Event</StyledTableCell>
                            <StyledTableCell>Actual Revenue</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            row.taskName === 'Billable' ? (
                                <HighlightedRow key={index}>
                                    <StyledTableCell >{row.taskName}</StyledTableCell>
                                    <StyledTableCell >{row.taskStatus}</StyledTableCell>
                                    <StyledTableCell>{row.budgetHours}</StyledTableCell>
                                    <StyledTableCell>{row.loggedHours}</StyledTableCell>
                                    <StyledTableCell>{row.devCost}</StyledTableCell>
                                    <StyledTableCell>{row.breakEvent}</StyledTableCell>
                                    <StyledTableCell>{row.actualRevenue}</StyledTableCell>
                                </HighlightedRow>
                            ) : (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.taskName}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.taskStatus.includes('Total') ? (
                                            <Typography>{row.taskStatus}</Typography>
                                        ) : (
                                            <TaskStatusChip status={row.taskStatus} />
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.budgetHours}</StyledTableCell>
                                    <StyledTableCell>{row.loggedHours}</StyledTableCell>
                                    <StyledTableCell>{row.devCost}</StyledTableCell>
                                    <StyledTableCell>{row.breakEvent}</StyledTableCell>
                                    <StyledTableCell>{row.actualRevenue}</StyledTableCell>
                                </StyledTableRow>
                            )
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
