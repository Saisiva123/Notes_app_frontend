import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteDetails, setNoteDetails] = useState({ name: '', text: '', id: null });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + "notes");
        setNotes(response.data);
      } catch (err) {
        console.log("Error while retrieving the notes.", err);
      }
    };

    fetchData();
  }, []);

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "notes", noteDetails);
      setNotes([...notes, response.data]);
      setNoteDetails({ name: '', text: '', id: null });
    } catch (err) {
      console.log("Error creating note.", err);
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(process.env.REACT_APP_API_URL + "notes/" + noteDetails.id, noteDetails);
      setNotes(notes.map(note => (note._id === noteDetails.id ? response.data : note)));
      setNoteDetails({ name: '', text: '', id: null });
      setIsEditing(false);
    } catch (err) {
      console.log("Error updating note.", err);
    }
  };

  const editNote = (note) => {
    setNoteDetails({ name: note.name, text: note.text, id: note._id });
    setIsEditing(true);
  };

  const deleteNote = async (noteDetails) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + "notes/" + noteDetails._id);
      setNotes(notes.filter(note => note._id !== noteDetails._id));
    } catch (err) {
      console.log("Error deleting note.", err);
    }
  };

  return (
    <div className="App">
      <h2>Notes APP</h2>
      <p>Currently running in <b>{process.env.REACT_APP_ENV}</b> environment.</p>

      <form onSubmit={isEditing ? updateNote : createNote}>
        <input 
          type="text" 
          placeholder="Note Name" 
          value={noteDetails.name} 
          onChange={(e) => setNoteDetails({ ...noteDetails, name: e.target.value })} 
          required 
        />
        <textarea 
          placeholder="Note Text" 
          value={noteDetails.text} 
          onChange={(e) => setNoteDetails({ ...noteDetails, text: e.target.value })} 
          required 
        />
        <button type="submit">{isEditing ? 'Update Note' : 'Create Note'}</button>
        {isEditing && <button type="button" onClick={() => { setIsEditing(false); setNoteDetails({ name: '', text: '', id: null }); }}>Cancel</button>}
      </form>

      <div className='notes'>
        {notes.length > 0 ? notes.map((note, index) => (
          <div key={index} className='note'>
            <span>
              <p><strong>{note.name}</strong></p>
              <p>{note.text}</p>
            </span>
            <button onClick={() => editNote(note)}>Edit</button>
            <button onClick={() => deleteNote(note)}>Delete</button>
          </div>
        )) : <p>No notes available.</p>}
      </div>
    </div>
  );
}

export default App;
