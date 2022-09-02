import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Filter extends Component {
  render() {
    const {
      filterByName,
      filter,
      filterByRarity,
      filterBySuperTrunfo,
      filterCkecked,
    } = this.props;
    return (
      <label htmlFor="filter" className="filter-items">
        <input
          type="text"
          id="filter"
          data-testid="name-filter"
          onChange={ filterByName }
          value={ filter }
          disabled={ filterCkecked }
          placeholder="Search by name"
          className="search-name"
        />
        <label htmlFor="filter-rare">
          Search by rarity:
          {' '}
          <select
            data-testid="rare-filter"
            id="filter-rare"
            onChange={ filterByRarity }
            disabled={ filterCkecked }
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="check-filter">
          Super Trunfo
          {' '}
          <input
            type="checkbox"
            name="SuperTrunfo"
            id="check-filter"
            onChange={ filterBySuperTrunfo }
            data-testid="trunfo-filter"
          />
        </label>

      </label>
    );
  }
}

Filter.propTypes = {
  filterByName: PropTypes.func.isRequired,
  filterByRarity: PropTypes.func.isRequired,
  filterBySuperTrunfo: PropTypes.func.isRequired,
  filterCkecked: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};
