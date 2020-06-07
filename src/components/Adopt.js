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
        <section className="pets-section">
          <h1>Pets</h1>
          {Object.entries(pets).map(([pet, type]) => {
            return pet ? (
              <div>
                <h4>{pet.name}</h4>
                <img src={pet.imageURL} alt={pet.description} />
                <section>
                  <p>{pet.breed}</p>
                  <p>{pet.gender}</p>
                  <p>{pet.age}</p>
                </section>
                <form name="adoption" onClick={this.handleAdopt}>
                  <label htmlFor="adopt-pet">Adopt {pet.name}</label>
                  <input type="button" id="adopt-pet">
                    Click to adopt
                  </input>
                </form>
              </div>
            ) : (
              <div>
                <h4>No pets not found!</h4>
              </div>
            );
          })}
        </section>
        <section className="people-section">
          <h1>People</h1>
        </section>
      </div>
    );
  }
}

export default Adopt;
