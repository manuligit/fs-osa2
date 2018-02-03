import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      newNote: '',
      showAll: true
    }
    console.log('constructor')
  }

//componentDidMount() {
//  console.log('will mount')
//    axios
//      .get('http://localhost:3001/notes')
//      .then(response => {
//        console.log('promise fulfilled')
//        this.setState({ notes: response.data })
//     })
//  }

componentDidMount() {
  noteService
    .getAll()
    .then(response => {
      this.setState({ notes: response })
    })
}
  

handleNoteChange = (event) => {
  console.log(event.target.value)
  this.setState({ newNote: event.target.value })
}

addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: this.state.newNote,
    date: new Date().new,
    important: Math.random() > 0.5
}
  
  noteService
  .create(noteObject)
  .then(newNote => {
    this.setState({
      notes: this.state.notes.concat(newNote),
      newNote: ''
    })
  })

}

toggleVisible = () => {
  this.setState({showAll: !this.state.showAll})
}
  
toggleImportanceOf = (id) => {
  return () => {
    console.log(`importance of ${id} is being toggled`)
    const url=`http://localhost:3001/notes/${id}`
    const note= this.state.notes.find(n => n.id === id)
    const changedNote = { ...note, important:!note.important}

    noteService
    .update(id, changedNote)
    .then(changedNote => {
      const notes = this.state.notes.filter(n => n.id !== id)
      this.setState({
        notes: notes.concat(changedNote)
      })
    })
      
  }
}

render() {
  console.log('render')
  const notesToShow =
    this.state.showAll ?
    this.state.notes :
    this.state.notes.filter(note => note.important === true)

  const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <div>
        <button onClick={this.toggleVisible}>
          näytä {label}
        </button>
      </div>

      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={this.toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={this.addNote}>
        <input
          value={this.state.newNote}
          onChange={this.handleNoteChange}
        />
        <button type="submit">tallenna</button>
      </form>
    </div>
    )
  }
}

export default App