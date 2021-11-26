import axios from "axios";
import { Card } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

export default function StockNewsListItem(props) {
 
  function getNewsDetails(){
    let id = props.uuid;
    const options = {
      method: 'GET',
      url: 'https://yh-finance.p.rapidapi.com/news/v2/get-details',
      params: {uuid: id, region: 'US'},
      headers: {
        'x-rapidapi-host': process.env.REACT_APP_X_RAPIDAPI_HOST,
        'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY
      }
    };
    
    axios.request(options).then(function (response) {
      const clickUrl = response.data.data.contents[0].content.canonicalUrl.url;  
      window.open(clickUrl);
    }).catch(function (error) {
      console.error(error);
    });
  }
  
  return (
    <Container>
      <Card style={{ width: '40rem', background: 'rgb(99 99 99)' }}>
        <ListGroup horizontal>
          <ListGroup.Item>
            <Image src={props.thumbnail} rounded />
          </ListGroup.Item>
          <ListGroup.Item onClick={getNewsDetails} style={{fontSize: '2rem', height: '10rem'}}>
            {props.title}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  )
}
