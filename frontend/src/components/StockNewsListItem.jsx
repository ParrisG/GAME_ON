import axios from "axios";

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
    <div>
      <ul>
        <li>
          <img src={props.thumbnail} /> 
        </li>
        <li>
          {props.provider}
          {props.duration}
          <h5 onClick={getNewsDetails}>{props.title}</h5> 
        </li> 
      </ul> 
    </div>
  )
}
