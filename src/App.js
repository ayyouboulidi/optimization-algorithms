import React, { Component } from 'react';
//import Dijkstra from './dijkstra';
//import Prim from './prim';
//import Kruskal from './kruskal';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      nombreVille: '3'
    }
  }

  handleInputChange = event => {
    const value = event.target.value;

    this.setState({nombreVille: value});
  }

  renderDistance(nombre){
    const distances = [];
    let start = 1;
    const n = parseInt(nombre)

    for(; start <= n; start++){
      let random = parseInt(Math.random()*( n - 1) + 1);

      if(random !== start){
        distances.push(
          <div key={start} className="col-2">
            <span style={{color:'red'}}>{`x${start}-x${random}: `}</span>
            { parseInt(Math.random()*(900 - 40) + 40)}km
          </div>
        )
      }
    }

    return distances;
  }


  render() {
    return (
      <div className="container">
        <div className="row" style={{backgroundColor: 'red'}}>
          <div className="col-4 d-flex justify-content-start"> Sujet TIPE OULIDI OMALI Sara</div>
          <div className="col-4 d-flex justify-content-center"> Juin 2017</div>
          <div className="col-4 d-flex justify-content-end"> CPGE Al-Cachy Fès-Maroc</div>
        </div>
        <div className="row" style={{backgroundColor: 'green'}}>
          <div className="col-6 d-flex justify-content-start"> Le nombre de villes</div>
          <div className="col-6 d-flex justify-content-end"> La distance entre les villes</div>
        </div>
        <div className="row" style={{backgroundColor: 'green'}}>
          <div className="col-2 d-flex justify-content-start">
            <select value={this.state.nombreVille} onChange={this.handleInputChange}>
              <option value="3">3</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row d-flex justify-content-end">
            {
              this.renderDistance(this.state.nombreVille)
            }
          </div>
        </div>
        {/*<Dijkstra EdgesList={[]}/>
        <Kruskal EdgesList={[]}/>
        <Prim EdgesList={[]}/>*/}
      </div>
    );
  }
}