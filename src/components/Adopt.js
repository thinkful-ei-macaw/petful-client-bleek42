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
    this.fetchPeople();
    this.fetchPets();
    // this.interval = setInterval(() => {
    //   const { people, user } = this.state;
    //   if (!people.length) {
    //     this.setState({
    //       error: true,
    //     });
    //   }
    //   if (people[0] === user && people.length < 5) {
    //     this.demoUsers();
    //   } else if (people[0] !== user && people.length > 2) {
    //     this.demoAdopt();
    //   }
    // }, 5000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  fetchPeople = () => {
    getPeople()
      .then((person) =>
        this.setState({
          people: person.people,
        })
      )
      .catch((error) => {
        this.setState({
          error: true,
        });
      });
  };

  fetchPets = () => {
    getPets()
      .then((pet) =>
        this.setState({
          pets: pet.pets,
        })
      )
      .catch((error) => {
        this.setState({
          error: true,
        });
      });
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
    const { people, pets, user, staff, error } = this.state;
    console.log(this.state.people);
    if (error === false) {
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
            <ul>
              {Object.entries(pets).map(([type, pet]) => {
                return pet(
                  <div>
                    <h4>{pet.name}</h4>
                    <img src={pet.imageURL} alt={pet.description} />
                    <details>
                      | {pet.age} | {pet.type} | {pet.breed} | {pet.gender} |
                    </details>
                    <p>{pet.story}</p>
                    <form>
                      <label>Adopt this pet?</label>
                      <input type="submit" id="adopt-btn">
                        Take {pet.name} home!
                      </input>
                    </form>
                  </div>
                );
              })}
            </ul>
          </section>
        </div>
      );
    } else {
      return (
        <div className="error-render">
          <h1>Uh-Oh!</h1>
          <section>
            <p>It appears something went wrong!</p>
          </section>
        </div>
      );
    }
  }
}

export default Adopt;
