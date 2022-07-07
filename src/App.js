import { useEffect, useRef, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { search } from './apiServices/weatherServes';
import { useAsciiSlug } from './hooks';
import styled, { keyframes } from 'styled-components';
import './App.scss';
import moment from 'moment';
import CardItem from './components/CardItem/CardItem';

function App() {
  const inputRef = useRef();
  const [valueInput, setValueInput] = useState('');
  const [searchResult, setSearchResult] = useState({});

  const asciiSlug = useAsciiSlug;

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

  useEffect(() => {
    const app = async () => {
      const input = asciiSlug(valueInput);
      console.log('valueSearchinput:', input);

      const result = await search(input);
      setSearchResult(result);
    };
    valueInput.trim().length > 0 ? app() : setSearchResult({});

    return () => {
      // cleanup
    };
  }, [valueInput]);

  const handleSearch = () => {
    const valueSearch = inputRef.current.value;

    setSearchResult({});

    setValueInput(valueSearch);
  };

  function renderResultSearch() {
    if (Object.keys(searchResult).length > 0) {
      const data = searchResult.forecast.forecastday;
      return data.map((item, index) => {
        const day = moment(item.date).format('dddd');
        return <CardItem key={index} day={day} item={item} resultSearch={searchResult} />;
      });
    }
  }
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
