import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'

import withStyles from "@material-ui/core/styles/withStyles"

const CustomTableCell = withStyles(theme => ({
  root: {
    border: "none",
    padding: "10px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  head: {
    backgroundColor: "#232323",
    color: "#c5c5c5",
  },
  body: {
    fontSize: 14,
    color: "white"
  }
}))(TableCell)

const CustomTableSortLabel = withStyles({
  root: {
    "&:hover": {
      color: "#d9d9d9 !important"
    }
  },
  active: {
    color: "#fff !important"
  }
})(TableSortLabel)

class EnhancedTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const { columns, order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map(
            column => (
              <CustomTableCell
                key={column.id}
                align={column.numeric ? 'right' : 'left'}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <CustomTableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </CustomTableSortLabel>
                </Tooltip>
              </CustomTableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead
