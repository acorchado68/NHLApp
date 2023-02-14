import React, { Component } from 'react';
import { Schedule } from './Schedule/Schedule';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <Schedule />
    );
  }
}
