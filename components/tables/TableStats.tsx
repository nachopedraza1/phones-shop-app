'use client';
import { styled } from '@mui/material/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { Attribute } from "@/interfaces/MeliProduct"

const TableStats: React.FC<{ attributes: Attribute[], title: string }> = ({ attributes, title }) => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#ebebeb',
        },
    }));

    return (
        <TableContainer component={Paper} sx={{ mt: 3}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={6} sx={{ fontWeight: 600 }}> {title} </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attributes.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell>
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell>
                                {row.value_name}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableStats;