import React, { Component } from 'react';
import { getPeople, addPerson, getPets, adoptPet } from './APIService';

class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: {
        dog: null,
        cat: null,
      },
      staff: this.shelterStaff,
      people: [],
      nextPerson: sessionStorage.getItem('user-name') || null,
      error: false,
    };
  }

  shelterStaff = ['Brandon Leek', 'Donna Leek', 'Liz Nye', 'Noah Jennsen'];

  componentDidMount() {
    getPets();
    getPeople();
    this.interval = setInterval(() => {
      const { people, nextPerson } = this.state;
      if (!people.length) {
        this.setState({
          error: true,
        });
      }
      if (people[0] === nextPerson && people.length < 5) {
        this.demoUsers();
      } else if (people[0] !== nextPerson && people.length > 2) {
        this.demoAdopt();
      }
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  demoUsers = () => {
    const person = this.shelterStaff[this.state.people.length - 1];
    addPerson(person);
  };

  demoAdopt = () => {
    const { pets } = this.state;
    const types = Object.entries(pets).filter(([pet, type]) => pet[type]);
    if (types.length === 0) {
      this.setState({
        error: true,
      });
    }
    this.handleAdopt();
  };

  handleAdopt = (type) => {
    adoptPet(type).then(() => {
      const { people, nextPerson } = this.state;
      if (people[0] === nextPerson) {
        sessionStorage.removeItem('user-name');
        this.setState({
          nextPerson: null,
        });
      }
    });
  };

  handleAddPerson = (ev) => {
    ev.preventDefault();
    const userName = ev.target.user.value;
    addPerson(userName).then(() => {
      sessionStorage.setItem('user-name', userName);
      this.setState({
        nextPerson: userName,
      });
    });
  };

  render() {
    const { people, pets, staff, error } = this.state;
    if (error === true) {
      return (
        <div className="error-render">
          <h1>Uh-Oh!</h1>
          <section>
            <p>It appears something went wrong!</p>
          </section>
        </div>
      );
    } else {
      return (
        <div className="adopt-page">
          <h1>Welcome to the adoption page!@</h1>
        </div>
      );
    }
  }
}

export default Adopt;
