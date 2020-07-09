import React, { Component } from 'react';

import Pet from './Pet';
import {
  getPeople,
  addPerson,
  getAllPets,
  getNextPets,
  adoptCat,
  adoptDog,
} from './APIService';

class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      people: [],
      staff: [],
      user: sessionStorage.getItem('user-name') || null,
      hasError: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const petData = await getNextPets();
      const peopleData = await getPeople();
      this.setState({
        pets: petData,
        people: peopleData,
      });
    } catch (error) {
      this.setState({
        hasError: true,
      });
    }
  };

  setStaff = () => {
    const shelterStaff = [
      {
        name: 'Brandon Leek',
        id: Math.round(Math.random() * 10),
      },
      {
        name: 'Donna Leek',
        id: Math.round(Math.random() * 10),
      },
      {
        name: 'Liz Nye',
        id: Math.round(Math.random() * 10),
      },
      {
        name: 'Brandon Leek',
        id: Math.round(Math.random() * 10),
      },
    ];
    shelterStaff.map((name, id) => {
      return this.setState({
        staff: shelterStaff,
        ...name,
        ...id,
      });
    });
    console.log(this.state.staff);
  };

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
    const { pets, people, user, staff, error } = this.state;
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
          {Object.entries(pets).map((type) => {
            const { cat, dog } = type[1];
            return (
              <div>
                <details>
                  <img src={cat.imageURL} alt={cat.description} />
                  <ul>
                    <li>{cat.name}</li>
                  </ul>
                </details>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Adopt;
