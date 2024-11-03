import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [notes, setNotes] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(process.env.REACT_APP_API_URL + "notes");
        setNotes(response.data); // Update state with the fetched data
      } catch (err) {
        console.log("error while retrieving the notes.", err)
      }
    };

    fetchData();
  }, [])

  const deleteNote = async (noteDetails) => {
    await axios.delete(process.env.REACT_APP_API_URL + "notes/" + noteDetails._id).then(res => {
      let notesCopy = notes.filter(note => note.name !== noteDetails.name);
      setNotes([...notesCopy])
    })
  }

  return (
    <div className="App">
      <h2>Notes APP</h2>
      <p>Currently running in <b>{process.env.REACT_APP_ENV}</b> environtment.</p>

      <div className='notes'>
        {notes?.length && notes.map((note, index) => {
          return <div key={index} className='note'>
            <span>
            <p>{note.name}</p>
            <p>{note.text}</p>
            </span>

            <button onClick={() => deleteNote(note)}>Delete</button>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
