import React, { Component } from 'react';
import { getDog, getCat, adoptDog, adoptCat } from '../components/APIService';

export class Pet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dog: null,
      cat: null,
      hasError: null,
    };
  }

  componentDidMount() {
    const { type } = this.props;
    if(type === 'dog') {
      getDog().then((nextDog) => {
        this.setState({
          dog: nextDog,
        })
      })
    }
    else if(type === 'cat') {
      getCat().then((nextCat) => {
        this.setState({
          cat: nextCat
        })
      })
    }
    else {
      this.setState({
        hasError: true
      })
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
        {/* <h4>{pets.name}</h4>
        <img src={pets.imageURL} alt={pets.description} />
        <details>
          <p>
            | {pets.age} | {pets.type} | {pets.breed} | {pets.gender} |
          </p>
        </details>
        <p>{pets.story}</p> */}
      </div>
    );
  }
}

export default Pet;
