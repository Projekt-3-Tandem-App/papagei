import React, { Component } from 'react'
import Navbar from './layout/Navbar'


export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <h1 className= "m-3">HomePage</h1>
      </div>
    )
  }
}
