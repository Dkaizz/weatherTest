import { Card } from 'react-bootstrap';
import styled from 'styled-components';

function CardItem({ item, resultSearch, day }) {
  const CardImg = styled(Card.Img)`
    border-bottom: 1px solid #ccc;
  `;
  return (
    <div className="col">
      <Card>
        <CardImg variant="top" src={item.day.condition.icon} />
        <Card.Body>
          <Card.Title>
            {resultSearch.location.name}/{resultSearch.location.country}
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
}

export default CardItem;
