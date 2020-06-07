import React, { Component } from 'react';
import { getPets, adoptPet, getPeople } from './API-Service';

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

  fetchData = () => {
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
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { people, pets } = this.state;
    return (
      <div>
        <section>
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
              </div>
            ) : (
              <div>
                <h4>{type} not found!</h4>
              </div>
            );
          })}
        </section>
        <section>
          <h1>People</h1>
        </section>
      </div>
    );
  }
}

export default Adopt;
