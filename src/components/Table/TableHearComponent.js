import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { Box, TableRow, TableCell, TableHead } from '@mui/material';


TableHeaderComponet.propTypes = {

    headLabel: PropTypes.array,

};

function TableHeaderComponet({ headLabel }) {
    return (

        <TableHead>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell key={headCell.id}>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>


    );
}

export default TableHeaderComponet;