import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      search: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response => {
        this.setState({ countries: response.data }) 
      })
  }

  handleChange = (event) => {
    this.setState({ search: event.target.value})
    //console.log(event.target.value)
  }

  render() {
    //console.log(this.state.search)
    var found = []
    found = this.state.search?
                this.state.countries.filter(item => {
                  return item.name.toLowerCase().includes(this.state.search.toLowerCase())
                }) : []

    //console.log(found)

    if (found.length > 10) {
      found = []
      return (
        <div> find countries 
          <input value={this.state.search} onChange={this.handleChange}/>
          <p>Too many countries</p>
        </div>
      )
    } else if (found.length === 1) {
      return ( 
        <div> find countries 
          <input value={this.state.search} onChange={this.handleChange}/>
          <div>
            <h1>{found[0].name}</h1>
            <p>
              capital: {found[0].capital}<br />
              population: {found[0].population}
            </p>
            <img src={found[0].flag} alt={found[0].name} width="800"/>
          </div>
        </div>
      )
    }
        
    return (
      <div> find countries 
        <input value={this.state.search} onChange={this.handleChange}/>
         {found.map((country => <div key={country.name} > {country.name} </div>))}
      </div>
    )
  }
}



export default App