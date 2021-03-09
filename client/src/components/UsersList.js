import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
export default class UsersList extends Component {
  state = {
    currentUser: this.props.user,
    users: [],
    location: '',
    nativeLanguages: '',
    learningLanguages: '', 
    showPersons: false,
  }
  componentDidMount(){
    this.getUsers()
  }
  getUsers = async () => {
    //console.log("route triggered to fget users")
    let response = await axios.get('/api/users')
    //console.log(response, "response at FE")
    let {data} = response;
    //console.log(data, "userlsit at FE")
    this.setState({users: data})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
   this.setState( {showPersons : !doesShow})
 }

  handleChange = event => {
    const name = event.target.name;
    const target = event.target; 
    const value = target.value;
   // console.log(name , value)
    this.setState({
      [name]: value
    })
    }



 
  render() {
    //console.log(this.props, "props at userslist")
    //console.log("USER location", this.state.currentUser.location)

    const filteredUsers = this.state.users.filter(eachuser => {
      return (eachuser.location === this.state.location || !this.state.location)
      && (eachuser.nativeLanguages === this.state.learningLanguages ||!this.state.learningLanguages)
      && (eachuser.learningLanguages.includes(this.state.nativeLanguages) ||!this.state.nativeLanguages)
    })
    console.log(filteredUsers)
    console.log("Check problem 1", this.state)


 
    
    return (


      <div> 
      <div className="  container-list m-3" >
      <div className=" flexbox" >
      <h1 className=" home-h1 m-3">Language Learners</h1>
      <a href="/" className="btn btn-primary"> <i className="fas fa-sliders-h  margin-y"></i> </a> </div>
      <form className=" form profile-top" onSubmit={this.handleSubmit}>
      <select name="location" id="location" form="carform" onChange={this.handleChange}>
          <option value='' selected> Choose your tandem location</option>
          <option value="">Show all location</option>
          <option value="berlin">Berlin</option>
          <option value="hambourg">Hamburg</option>
          <option value="paris">Paris</option>
          <option value="london">London</option>
          </select>
          <label htmlFor="learningLanguages" className=""></label>
          <select name="learningLanguages" id="learningLanguages" form="carform" onChange={this.handleChange} multiple>
          <option value="" selected> I want to learn </option>
          <option value="">All</option>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="italian">Italian</option>
          <option value="spanish">Spanish</option>
          </select>
          <select name="nativeLanguages" id="nativeLanguages" form="carform" onChange={this.handleChange}>
          <option value="" selected> I speak </option>
          <option value="">All</option>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="italian">Italian</option>
          <option value="spanish">Spanish</option>
          </select>
          {/* <button  className="btn btn-primary m-2" type="submit"> 
          <h3> Filter </h3></button> */}
      </form>
      </div>


{/*     

      {this.state.users.length === 0 ? (
        <div>Loading.....</div>
      ):
      

       ( */}

        {/* this.state.users.map((user, index) => { */}
        {filteredUsers.map((user, index) => {
          //console.log('HERE USER', user)
          return (
            <div  className="profiles container-list" key={index} >
            <div className= "profile bg-light" >
          <img
            className="round-img "
            src="https://www.iass-potsdam.de/sites/default/files/styles/square_round_2_up/public/default_images/default_avatar_0.png?itok=ytiGDvoH"
            alt=""
          />
          <div className="">
            <h2 className="my-1">{user.name}</h2>
            <h3> Age:{user.age}</h3>
            <h3> Gender: {user.gender}</h3>
            <h3> Location: {user.location}</h3>
            {/* <Link to="/showprofil"  className="btn  btn-dark my-2">View Profile</Link> */}
            <Link to={`/users/${user._id}`}  className="btn  btn-dark my-2">View Profile</Link>
          </div>
          <ul>
            <li className="text-primary">
              <p className="grey"> <i class="far fa-comments text-secondary "></i>Speaks</p>
              <h3>{user.nativeLanguages}</h3>
            </li>
            <li className="text-primary">
            <p className="grey"><i class="fas fa-comments  "></i> Learns</p>
              <h3>{user.learningLanguages}</h3>   
            </li>
          </ul>
        </div>
            </div>
            ) 
        })}

      {/* )} */}
      </div>
    )
  }

}




