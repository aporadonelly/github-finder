import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import './App.css';

export class App extends Component {
  state = {
    users: [],
    isLoading: false,
  };

  // async componentDidMount() {
  //   this.setState({isLoading: true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   this.setState({users: res.data, isLoading: false});
  // }

  searchUser = async (text) => {
    this.setState({ isLoading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, isLoading: false });
  };

  clearUsers = () => this.setState({ users: [], isLoading: false});

  render() {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <Search searchUser={this.searchUser} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true  : false}/>
          <Users loading={this.state.isLoading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
