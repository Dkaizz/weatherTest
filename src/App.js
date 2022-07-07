import { useEffect, useRef, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { search } from './apiServices/weatherServes';
import { useAsciiSlug, useNameDay } from './hooks';
import styled, { keyframes } from 'styled-components';
import './App.scss';

function App() {
  const inputRef = useRef();
  const [valueinput, setValueInput] = useState('');
  const [searchResult, setSearchResult] = useState({});

  const asciiSlug = useAsciiSlug;

  const fcDay = useNameDay;

  const show = keyframes`
  from {
    opacity: 0;
  transform: translateY(10%);

  }

  to {
    opacity: 1;
  transform: translateY(0);

  }
`;

  const ResultSearch = styled.div`
    width: 768px;
    animation: ${show} ease-in 0.6s;
  `;

  const DivInput = styled.div`
    margin-bottom: 50px;
    transition: all ease-in 0.6s;
    display: flex;
    align-items: center;
  `;

  const DivContainer = styled(Container)`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease-in 0.6s;

    flex-direction: column;
  `;

  const InputSearch = styled.input`
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 10px;
  `;

  const CardImg = styled(Card.Img)`
    border-bottom: 1px solid #ccc;
  `;

  useEffect(() => {
    console.log('useEffect');
    const app = async () => {
      const input = asciiSlug(valueinput);
      console.log('valueSearchinput:', input);

      const result = await search(input);
      setSearchResult(result);
    };
    if (valueinput.trim().length > 0) {
      app();
    } else {
      setSearchResult({});
    }

    return () => {
      // cleanup
    };
  }, [valueinput]);

  const handleSearch = () => {
    console.log('onclick');
    const valueSearch = inputRef.current.value;

    console.log('valueSearch:', valueSearch);
    setSearchResult({});

    setValueInput(valueSearch);
  };

  function renderResultSearch() {
    if (Object.keys(searchResult).length > 0) {
      console.log('searchResult:', searchResult);
      const data = searchResult.forecast.forecastday;
      return data.map((item, index) => {
        const day = fcDay(item.date);
        return (
          <div className="col" key={index}>
            <Card>
              <CardImg variant="top" src={item.day.condition.icon} />
              <Card.Body>
                <Card.Title>
                  {searchResult.location.name}/{searchResult.location.country}
                </Card.Title>
                <p>
                  {day} / {item.date}
                </p>
                <p> {item.day.condition.text}</p>
                <p>
                  Max Temp: <span className="maxtemp">{item.day.maxtemp_c}*C</span>
                </p>
                <p>
                  Min Temp: <span className="mintemp">{item.day.mintemp_c}*C</span>
                </p>
              </Card.Body>
            </Card>
          </div>
        );
      });
    }
  }
  console.log('render');
  return (
    <DivContainer>
      <DivInput>
        <InputSearch ref={inputRef} type="text" placeholder="Hà nội..." />
        <Button onClick={handleSearch} variant="outline-secondary">
          Tìm kiếm
        </Button>
        <button></button>
      </DivInput>
      <ResultSearch className={`row`}>{renderResultSearch()}</ResultSearch>
    </DivContainer>
  );
}

export default App;
