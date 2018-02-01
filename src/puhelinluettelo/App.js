import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addContact = (event) => {
    event.preventDefault()

    const contactObject = {
        name: this.state.newName
    }

    function isSame(person) {
        return person.name === contactObject.name;
    }

    //If a person with same name exists, don't add to it to the contact list:
    if (this.state.persons.find(isSame)) {
        console.log("same name")
        this.setState({newName: ''})
    } else {
        var temp = this.state.persons.concat(contactObject)
        this.setState({ persons: temp, newName: ''})
    }
  }





  handleContactChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addContact}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleContactChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
            <ul>
                {this.state.persons.map((person) => {return (<li key={person.name}>{person.name}</li>)})}
            </ul>
        <p>debug: {this.state.newName}</p> 
      </div>
    )
  }
}

export default App