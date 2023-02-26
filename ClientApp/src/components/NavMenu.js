import React, { Component } from 'react';
import { Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { TeamDropdown } from './common/TeamDropdown';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.state = {
      collapsed: true,
      teams: [],
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  async getTeams() {
    const response = await fetch("teams/GetActiveTeams");
    const data = await response.json();
    this.setState({})
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-col-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/schedule">Schedule</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/standings">League Standings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/statistics">Statistics</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/players">Players</NavLink>
              </NavItem>
              <TeamDropdown />
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
