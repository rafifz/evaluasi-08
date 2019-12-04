import React, { Component, useState, useEffect } from "react";
import Home from "../../component/Home";
import "./Home.css";
import "./article.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.liputan6.com%2Ffeed%2Frss"
      )
      .then(res => {
        this.setState({ data: res.data.items });
        console.log(res);
      });
  }

  render() {
    return (
      <Router>
        <div>
          <div id='top'></div>
          <Home
            childrenSidebar={this.state.data.map((item, index) => {
              return (
                
                <div className="Berita">
                  <img src={item.thumbnail} alt="#" />
                  <div>
                    <Link to={`${index + 1}`}>{item.title}</Link>
                    <p>{item.pubDate}</p>
                  </div>
                </div>
                
              );
            })}
            childrenCont={
              <div>
                <Switch>
                  <Route path="/:id" children={<Child />} />
                </Switch>
              </div>
            }
          />
        </div>
      </Router>
    );
  }
}
function Child(match) {
    const [Data, setData] = useState([]);
  
    async function fetchData() {
      const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.liputan6.com%2Ffeed%2Frss");
      res
        .json()
        .then(res => setData(res.items[id-1]))
    }
    useEffect(() => {
      fetchData();
    });
    let {id} = useParams()
    return (
      <div className='article'>
          <h1 className='title'>{Data.title}</h1>
          <div className='thumb'><img src={Data.thumbnail} alt="#" /></div>
          <div className='content'><p>{Data.description}</p></div>
      </div>
    );
}

export default HomeContainer;
