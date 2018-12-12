import React, { Component } from 'react';

class Child extends Component {
  constructor(...args) {
    super(...args);
    this.state = {local: "wtf"};
  }
  render() {
    const { local } = this.state;
    return (
      <p>
        Child
        {" "}
        <input
          type="text"
          value={local}
          onChange={e => this.setState({local: e.target.value})}
        />
      </p>
    );
  }
}

export default Child;
