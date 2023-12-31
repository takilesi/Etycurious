import { useEffect,useState } from 'react';
import './App.css';
import axios from 'axios'; 

function App() {
  let wordTyped="cat"; 
  const [word, setWord] = useState("")
  const [freq, setFreq] = useState(0)
  const [def, setDef] = useState([])
  // const [country, setCountry] = useState([])

  const getData = async (word) => {
    wordTyped = word; 
    const options = {
      method: 'GET',
      url: `https://wordsapiv1.p.rapidapi.com/words/${wordTyped}/frequency`,
      headers: {
        'X-RapidAPI-Key': '143280bb31msh90cc0477660eae7p193346jsnfc20028932fc',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      }
    };
    
    const options2 = {
      method: 'GET',
      url: `https://wordsapiv1.p.rapidapi.com/words/${wordTyped}/definitions`,
      headers: {
        'X-RapidAPI-Key': '143280bb31msh90cc0477660eae7p193346jsnfc20028932fc',
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setWord(response.data); 
      setFreq(response.data.frequency.perMillion)

      const response2 = await axios.request(options2);
      console.log(response2.data);
      setDef(response2.data.definitions); 
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getData("cat")

  },[])

  return (
    <>
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <div class="head">Etycurious: The Curious Etymologist</div>
          <h1></h1>
          <div className="search-box">
            <input type="text" placeholder="Type the word here..." id="inp-word" />
            <button id="search-btn" onClick={() => {
              
              getData(document.getElementById('inp-word').value)
              
              }}>Search</button>
          </div>
          <div id="result" className="result">
          <h1></h1>
            <div className="details">Word:  
              {" "+ word.word}
            </div>

            <p className="word-meaning">Definitions:{" "}</p>
              {def.map((eachDef,i)=>{
              return(
                <h6 className="defs" key={i}>{i+1}: {eachDef.definition}</h6>
              ) 
              })}





            <p className="word-meaning">Frequency of word per million:{" "}
              <strong>{ freq}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App;