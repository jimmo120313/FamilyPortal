import React from "react";
import {Header, Icon} from 'semantic-ui-react';
import "./App.css";
import { Component } from "react";
import Axios from "axios";


class App extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    Axios.get("http://localhost:5000/api/values").then(
      (response)=>{
        this.setState({
          values:response.data
        })
      }
    )
  }

  render() {
    return (
      <div>
        <Header>
          <Icon name='users' />
          <Header.Content>Family Portal</Header.Content>
        </Header>
          <ul>
            {this.state.values.map((value: any) => {
              return <li key={value.Id}>{value.name}</li>;
            })}
          </ul>
        
      </div>
    );
  }
}

export default App;
