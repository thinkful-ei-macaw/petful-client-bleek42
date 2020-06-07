import React, { Component } from 'react';
import { getPeople, getPets, adoptPet } from './APIService';

class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: {
        dog: null,
        cat: null,
      },
      people: [],
      error: null,
    };
  }

  componentDidMount() {
    getPets()
      .then((pets) => {
        getPeople().then((people) => {
          this.setState({
            pets: pets,
            people: people,
          });
        });
      })
      .catch((error) => {
        throw new Error({ error: 'could not find pets or people' });
      });
  }

  handleAdopt(ev) {
    ev.preventDefault();
    const target = ev.target.adoption.value;
  }

  render() {
    const { people, pets } = this.state;
    return (
      <div className="adopt-page">
        {Object.entries(pets).map(([pet]) => {
          return pet ? (
            <div>
              <h4>{pet.name}</h4>
              <img src={pet.imageURL} alt={pet.description} />
              <section>
                <p>{pet.breed}</p>
                <p>{pet.gender}</p>
                <p>{pet.age}</p>
              </section>
              <button name="adoption" onClick={() => this.handleAdopt}>
                Adopt {pet.name}
              </button>
            </div>
          ) : (
            <div>
              <h4>No pets found!</h4>
            </div>
          );
        })}
        <section className="people-section">
          <h1>People</h1>
        </section>
      </div>
    );
  }
}

export default Adopt;
