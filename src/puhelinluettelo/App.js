import React from 'react';
import Contacts from './components/Contacts';
import Notification from './components/Notification'
import contactService from './services/contacts'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
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
          }).then(
            this.setState({ message: `yhteystietoa ${contactObject.name} päivitetty` }),
            setTimeout(() => {
              this.setState({ message: null })
            }, 5000)
          )
          //console.log(this.state.persons)
      } 
      this.setState({newName: ''})
    } else if (contactObject.number === '' || contactObject.name === ''){
      console.log("no number or name")
    } else {
      //post the contactobject to the server

      contactService.create(contactObject)
        .then(newContact => {
          console.log(newContact)
          this.setState({ 
            persons: this.state.persons.concat(newContact),
            newName: '',
            newNumber: ''
          })
        }).then(
          this.setState({ message: `Kontakti ${contactObject.name} lisätty` }),
          setTimeout(() => {
            this.setState({ message: null })
          }, 5000)
        )
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
    //console.log('currentid ', currentid)
    if (currentid) {
      //console.log(this.state.persons)
      let person = this.state.persons.find(person => person.id.toString() === currentid.toString())
      //console.log(person)
      let kontakti = person && person.name
      let result = window.confirm(`Poistetaanko ${kontakti}?`)

      if (result) {
        contactService.remove(currentid)
          .then(response => {
            this.setState ({
              persons: this.state.persons.filter(person => {
                return person.id.toString() !== currentid.toString()
            })})
          }
        ).then(
          this.setState({ message: `yhteystieto ${kontakti} poistettu` }),
            setTimeout(() => {
              this.setState({ message: null })
            }, 5000)
        )
      }
    }
  }

  render() {
    const filterResults = this.state.filter? this.state.persons.filter(value => {
      return value.name.toString().toLowerCase().includes(this.state.filter.toLowerCase())}) : this.state.persons
    
    return (
      <div>
        <Notification message={this.state.message} />
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
        <Contacts filterResults={filterResults} deleteContact={this.deleteContact.bind(this)} />
      </div>
    )
  }
}

export default App