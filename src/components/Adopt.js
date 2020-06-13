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
      user: sessionStorage.getItem('user-name') || null,
      error: false,
    };
  }

  shelterStaff = ['Brandon Leek', 'Donna Leek', 'Liz Nye', 'Noah Jennsen'];

  componentDidMount() {
    getPets();
    getPeople();
    this.interval = setInterval(() => {
      const { people, user } = this.state;
      if (!people.length) {
        this.setState({
          error: true,
        });
      }
      if (people[0] === user && people.length < 5) {
        this.demoUsers();
      } else if (people[0] !== user && people.length > 2) {
        this.demoAdopt();
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData = async () => {
    try {
      const pets = await getPets();
      const people = await getPeople();
      const peopleData = await people.json();
      const petsData = await pets.json();
      this.setState({
        pets: petsData,
        people: peopleData,
      });
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  };

  demoUsers = () => {
    const person = this.shelterStaff[this.state.people.length - 1];
    addPerson(person).then(() => {
      this.fetchData();
    });
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
      const { people, user } = this.state;
      if (people[0] === user) {
        sessionStorage.removeItem('user-name');
        this.setState({
          user: null,
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
        user: userName,
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
          <header className="adopt-header">
            <h1>Welcome to the adoption page!</h1>
          </header>
          <section>
            <ul>
              {people.map((person) => (
                <li key={person}>{person.name}</li>
              ))}
            </ul>
          </section>
        </div>
      );
    }
  }
}

export default Adopt;
