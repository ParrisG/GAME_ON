import axios from "axios";
import Container from 'react-bootstrap/Container';
import './StockNewsListItem.css'

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
    <Container className="newsfeed__container" style={{borderBottom:'1px solid black',padding:'1px',paddingBottom:'2px'}}>
      <div className="newsfeed__inner">
        <div className="newsfeed__header">
          <span>{props.provider}</span>
          <br/>
          <span>{props.duration} ago</span>
        </div>
          <div>
            <table>
              <tr>
                <td><img  alt= '' style={{width:'100px',height:'100px',marginRight:'1.5rem'}}src={props.thumbnail}/></td>
                <td onClick={getNewsDetails}   className="newsfeed__title">{props.title}</td>
              </tr>
            </table>
        </div>
      </div>
    </Container>
  )
}
