import React, { Component } from 'react';

import Pet from './Pet';
import {
  getDog,
  getCat,
  getPeople,
  addPerson,
  getAllPets,
  adoptPet,
} from './APIService';

class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      staff: this.shelterStaff,
      user: sessionStorage.getItem('user-name') || null,
    };
  }

  shelterStaff = ['Brandon Leek', 'Donna Leek', 'Liz Nye', 'Noah Jennsen'];

  componentDidMount() {
    getPeople().then((data) => {
      this.setState({
        people: data.people,
      });
    });
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  demoUsers = () => {
    const person = this.shelterStaff[this.state.people.length - 1];
    addPerson(person).then(() => {
      this.setPeople();
      this.setPets();
    });
  };

  handleAddPerson = (ev) => {
    ev.preventDefault();
    const userName = ev.target.user.value;
    addPerson(userName).then(() => {
      sessionStorage.setItem('user-name', userName);
      this.setState({
        user: userName,
      });
    });
  };

  render() {
    const { people, user, staff, error } = this.state;
    console.log(people);
    return (
      <div className="adopt-page">
        <header className="adopt-header">
          <h1>Welcome to the adoption page!</h1>
        </header>
        <section className="people-queue">
          <ul>
            {people.map((person) => (
              <li name={person === user ? 'user' : ''} key={person[0]}>
                {person}
              </li>
            ))}
          </ul>
        </section>
        <section className="pet-queue">
          <Pet type="dog" />
          <Pet type="cat" />
        </section>
      </div>
    );
  }
}

export default Adopt;
