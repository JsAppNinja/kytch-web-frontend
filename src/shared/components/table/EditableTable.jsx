/* eslint-disable consistent-return */
import React, { PureComponent } from 'react';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import get from 'lodash.get';

export default class EditableTable extends PureComponent {
  static propTypes = {
    heads: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      editable: PropTypes.bool,
      sortable: PropTypes.bool,
    })).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    pageSize: PropTypes.number,
    onRowClick: PropTypes.func,
  };
  static defaultProps = {
    pageSize: 10,
    onRowClick: () => {},
  }
  constructor(props, context) {
    super(props, context);
    const originalRows = this.props.rows;
    const rows = originalRows.slice(0, this.props.pageSize);
    this.state = { rows, originalRows };
  }

  componentDidUpdate(prevProps) {
    // if ((this.props.rows !== prevState.rows) || (this.props.rows !== prevProps.rows)) {
    if (this.props.rows !== prevProps.rows) {
      this.setRows(this.props.rows);
    }
  }


  onRowClick = (rowIdx, row) => {
    if (this.props.onRowClick) {
      this.props.onRowClick(rowIdx, row);
    }
  }
  setRows(rows) {
    this.setState({ rows, originalRows: rows });
  }
  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i += 1) {
      const rowToUpdate = rows[i];
      rows[i] = update(rowToUpdate, { $merge: updated });
    }

    this.setState({ rows });
  };

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        if (get(a, sortColumn, null) === null && get(b, sortColumn, null) === null) {
          return 0;
        } else if (get(a, sortColumn, null) === null) {
          return -1;
        } else if (get(b, sortColumn, null) === null) {
          return 1;
        }
        return (get(a, sortColumn, null) > get(b, sortColumn, null)) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        if (get(a, sortColumn, null) === null && get(b, sortColumn, null) === null) {
          return 0;
        } else if (get(a, sortColumn, null) === null) {
          return 1;
        } else if (get(b, sortColumn, null) === null) {
          return -1;
        }
        return (get(a, sortColumn, null) < get(b, sortColumn, null)) ? 1 : -1;
      }
    };

    const sortRows = this.state.originalRows.slice(0);
    const rows = sortDirection === 'NONE' ?
      this.state.originalRows.slice(0, this.props.pageSize) :
      sortRows.sort(comparer).slice(0, this.props.pageSize);

    this.setState({ rows });
  };

  rowGetter = (i) => {
    const value = this.state.rows[i];
    if (value) value.get = _ => get(value, _);
    return value;
  }

  render() {
    return (
      <div className="table">
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          enableCellSelect={false}
          columns={this.props.heads}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          rowHeight={44}
          minColumnWidth={100}
          minHeight={Math.max(44 * this.state.rows.length, 350)}
          onRowClick={this.onRowClick}
        />
      </div>
    );
  }
}
