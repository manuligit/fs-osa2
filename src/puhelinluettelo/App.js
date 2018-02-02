import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123457' },
        { name: 'Arto Järvinen', number: '040-123458' },
        { name: 'Lea Kutvonen', number: '040-123459' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
  }
  }
  addContact = (event) => {
    event.preventDefault()

    const contactObject = {
        name: this.state.newName,
        number: this.state.newNumber
    }

    function isSame(person) {
        return person.name === contactObject.name;
    }

    //If a person with same name exists, don't add to it to the contact list:
    if (this.state.persons.find(isSame)) {
        console.log("same name")
        this.setState({newName: ''})
    } else if (contactObject.number === '' || contactObject.name === ''){
        console.log("no number or name")
    } else {
        var temp = this.state.persons.concat(contactObject)
        this.setState({ persons: temp, newName: '', newNumber: ''})
    }
  }

  handleNameChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newName: event.target.value})
  }
  
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value})
  }

  filter = (event) => {
    this.setState({ filter: event.target.value})
  }

  render() {
    //function containsLetters(value) {
    //    value.toString().toLowerCase()
    //    return value.includes(this.state.filter.toLowerCase())
    //}


    const filterResults = this.state.filter? this.state.persons.filter(value => {
        return value.name.toString().toLowerCase().includes(this.state.filter.toLowerCase())
    }) : this.state.persons

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <div>
          Rajaa tuloksia: <input value={this.state.filter} onChange={this.filter} />
        </div>
        <h3>Uusi kontakti</h3>
        <form onSubmit={this.addContact}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
            <tbody>
            {filterResults.map((person, index) => {return (<tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)})}
            </tbody>
        </table>
      </div>
    )
  }
}

export default App