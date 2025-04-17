import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    // Added a new key/value pair in the state to keep track of type
    this.state = {
      search: "",
      type: "all"
    };
  }

  // Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({search: event.target.value.trim().toLowerCase()});
  }

  // Event handling method for when an item in dropdown is selected
  onSelect = (eventKey) => {
    this.setState({type: eventKey});
  }
  
  filterItem = (item) => {
    // Checks if the current search term is contained in this item
    // Added condition to check item's type
    const matchesSearch = item.name.toLowerCase().search(this.state.search) !== -1;
    const matchesType = this.state.type === "all" || item.type.toLowerCase() === this.state.type.toLowerCase();
    
    return matchesSearch && matchesType;
  }
  
  render() {
    return (
      <div className="filter-list">
        <h1>Produce Search</h1>
        <Dropdown onSelect={this.onSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Type: {this.state.type.charAt(0).toUpperCase() + this.state.type.slice(1)}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Item eventKey="fruit">Fruit</Dropdown.Item>
            <Dropdown.Item eventKey="vegetable">Vegetable</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <input type="text" placeholder="Search" onChange={this.onSearch} />
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;