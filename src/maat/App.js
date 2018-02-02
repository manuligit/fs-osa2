import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      search: '',
      selected: {name: ''}
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
    this.setState({ search: event.target.value,
                    selected: {name: ''}})
    //console.log(event.target.value)
  }

  clickCountry = (country, event) => {
    // set clicked country as 'selected'
    this.setState({ selected: country})
    console.log(this.state.selected)
  }

  setSelected = (country) => () => {
    console.log('country ', country)
    this.setState({ selected: country })
  }

  render() {
    //console.log(this.state.selected)
    //console.log(this.state.search)
    var found = []
    found = this.state.search?
                this.state.countries.filter(item => {
                  return item.name.toLowerCase().includes(this.state.search.toLowerCase())
                }) : []

    //if only one match, show it similar to selected one
    if (found.length === 1) {
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

    //show item after clicked div:
    if (this.state.selected.name.length > 0) {
      return ( 
        <div> find countries 
          <input value={this.state.search} onChange={this.handleChange}/>
          <div>
            <h1>{this.state.selected.name}</h1>
            <p>
              capital: {this.state.selected.capital}<br />
              population: {this.state.selected.population}
            </p>
            <img src={this.state.selected.flag} alt={this.state.selected.name} width="800"/>
          </div>
        </div>
      )
    }

    //don;t show anything if too many items:
    if (found.length > 10) {
      found = []
      return (
        <div> find countries 
          <input value={this.state.search} onChange={this.handleChange}/>
          <p>Too many countries</p>
        </div>
      )
    } 
    
    //clicking a div creates one country as selected
    return (
      <div> find countries 
        <input value={this.state.search} onChange={this.handleChange}/>
         {found.map((country => <div value={this.state.selected} onClick={(e) => this.clickCountry(country, e)} key={country.name} > {country.name} </div>))}
      </div>
    )
  }
}

export default App