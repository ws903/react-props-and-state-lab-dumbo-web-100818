import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changePets = newPets => {
    this.setState({
      pets: newPets
    })
  }

  onChangeType = petType => {
    this.setState({
      filters: {
        type: petType
      }
    })
  }

  onAdoptPet = petId => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets });
  }

  onFindPetsClick = () => {
    let url = '/api/pets'
    if(!(this.state.filters.type === 'all')) {
      url+=`?type=${this.state.filters.type}`
    }
    fetch(url)
    .then(resp => resp.json())
    .then(pets => {
      this.changePets(pets)
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
