import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState([""]);
  const [gptResponses, setGptResponses] = useState([""]);
  const [fetchData, setFetchData] = useState([]);
  // const [chats, setChats] = useState<Chat[]>([]);

  // type Chat = {
  //   inputValue: string;
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValues([inputValue, ...inputValues]);
    setInputValue("");
    setGptResponses([inputValue.charAt(0), ...gptResponses]);

    const endpointURL = `https://pixabay.com/api/?key=36042035-05f311cedad5b347cfbfe8988&q=apple&image_type=photo&pretty=true`;

    fetch(endpointURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.hits);
        setFetchData(data.hits);
        console.log(data.hits[0].id);
      });
  };

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" onChange={(e) => handleChange(e)} />
        <input type="submit" value="送信" />
      </form>
      <ul>
        {inputValues.map((inputValue, index) => (
          <>
            <li>{inputValue}</li>
            <li>{gptResponses[index]}</li>
            {/* <li>{fetchData[index]}</li> */}
          </>
        ))}
      </ul>
    </div>
  );
}

export default App;
