import React from 'react';
import Contacts from './components/Contacts';
import contactService from './services/contacts'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }
  
  addContact = (event) => {
    event.preventDefault()
    let contactObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    function isSame(person) {
      return person.name === contactObject.name;
    }

    //If a person with same name exists, don't add to it to the contact list:
    if (this.state.persons.find(isSame)) {
      console.log("same name")
      var result = window.confirm(`${contactObject.name} on jo luettelossa, korvataanko vanha numero uudella?`)

      if (result) {
        //copy persons to add updated contactobject to state
        var persons_copy = this.state.persons.slice(0)

        // get the id from the original person
        var found = persons_copy.find(isSame)
        let foundid = found.id

        // update id to contactobject
        contactObject = {
          name: this.state.newName,
          number: this.state.newNumber,
          id: foundid
        }

        // find index of contactobject in the state
        let index = persons_copy.findIndex(isSame)
        persons_copy[index] = contactObject;

        // update data on server based on id and the new object
        contactService.update(foundid, contactObject)
          .then(response => {
            this.setState({ 
              persons: persons_copy,
              newName: '',
              newNumber: ''
            })
          })
          //console.log(this.state.persons)
      } 
      this.setState({newName: ''})
    } else if (contactObject.number === '' || contactObject.name === ''){
      console.log("no number or name")
    } else {
      //post the contactobject to the server
      var temp = this.state.persons.concat(contactObject)

      contactService.create(contactObject)
        .then(newContact => {
          this.setState({ 
            persons: temp,
            newName: '',
            newNumber: ''
          })
        })
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

  componentDidMount() {
    //console.log('mount')
    contactService.getAll()
      .then(response => {
        this.setState({ persons: response})
      })
  }

  deleteContact = (event) => {
    var currentid = event.target.value
    if (currentid) {
      var kontakti = this.state.persons[currentid-1].name
      var result = window.confirm(`Poistetaanko ${kontakti}?`)

      if (result) {
        contactService.remove(currentid)
          .then(response => {
            this.setState ({
              persons: this.state.persons.filter(person => {
                return person.id.toString() !== currentid.toString()
              })})
          }
        )
      }
    }
  }

  render() {
    const filterResults = this.state.filter? this.state.persons.filter(value => {
      return value.name.toString().toLowerCase().includes(this.state.filter.toLowerCase())}) : this.state.persons
    
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
        <Contacts filterResults={filterResults} deleteContact={this.deleteContact} />
      </div>
    )
  }
}

export default App