import React, { Component } from 'react';
import { getDog, getCat, adoptDog, adoptCat } from '../components/APIService';

export class Pet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      hasError: null,
    };
  }

  componentDidMount() {
    if (this.props.type === 'dog') {
      getDog()
        .then((res) => res.json())
        .then((currDog) =>
          this.setState({
            pets: currDog,
          })
        )
        .catch((error) => {
          this.setState({
            hasError: true,
            error,
          });
        });
    }
    if (this.props.type === 'cat') {
      getCat()
        .then((res) => res.json())
        .then((currCat) =>
          this.setState({
            pets: currCat,
          })
        )
        .catch((error) => {
          this.setState({
            hasError: true,
            error,
          });
        });
    }
  }

  handleAdopt = async (ev) => {
    ev.preventDefault();
  };

  render() {
    const { pets } = this.state;
    console.log(pets);
    return (
      <div>
        <h4>{pets.name}</h4>
        <img src={pets.imageURL} alt={pets.description} />
        <details>
          | {pets.age} | {pets.type} | {pets.breed} | {pets.gender} |
        </details>
        <p>{pets.story}</p>
      </div>
    );
  }
}

export default Pet;
