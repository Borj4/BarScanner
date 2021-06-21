import './App.css';
import React, { Component } from 'react';
import Scanner from '../src/components/Scanner';
import Result from '../src/components/Result';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      results: []
    };
    this._scan = this._scan.bind(this);
    this._onDetected = this._onDetected.bind(this);
  }

  _scan() {
    this.setState({ scanning: !this.state.scanning });
  }

  _onDetected(result) {
    this.setState({ results: this.state.results.concat([result]) });
  }
  render() {
    return (
      <div>
        <button onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Start'}</button>
        <ul className="results">
          {this.state.results.map((result, idx) => {
            return (<Result key={result.codeResult.code} result={result} />)
          })}
        </ul>
        {this.state.scanning ? <Scanner onDetected={(result) => this._onDetected(result)} /> : null}
      </div>
    );
  }
}