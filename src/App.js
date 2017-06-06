import React, { Component } from 'react';
//import Dijkstra from './dijkstra';
//import Prim from './prim';
import Kruskal from './kruskal';
import 'bootstrap/dist/css/bootstrap.css';

/** 
 * @export
 * @class App
 * @extends {Component}
 */
export default class App extends Component {

  /**
   * Creates an instance of App.
   * @param {object} props 
   * 
   * @memberof App
   */
  constructor(props){
    super(props);

    this.state = {
      nombreVille: '3'
    }
  }

  /**
   * Handle input change
   * 
   * 
   * @memberof App
   */
  handleInputChange = event => {
    const value = event.target.value;

    this.setState({nombreVille: value});
  }

  /**
   * generate the distances between cities
   * 
   * @param {number} nombre 
   * @returns {array}
   * 
   * @memberof App
   */
  renderDistance(nombre){
    const distances = [];
    this.edges = [];
    this.nodes = [];
    let start = 1;
    const n = parseInt(nombre, 10)

    for(; start < n; start++){
      const distance = parseInt(Math.random()*(900 - 40) + 40, 10);

      this.edges.push([`x${start}`,`x${start+1}`, distance]);
      this.nodes.push(`x${start}`)

        distances.push(
          <div key={start} className="col-2">
            <span style={{color:'red'}}>{`x${start}-x${start+1}: `}</span>
            { distance }km
          </div>
        )
    }

    for(start = 1; start <= n; start++){
      let random = parseInt(Math.random()*( n - 1) + 1, 10);
      const distance = parseInt(Math.random()*(900 - 40) + 40, 10);

      let isIn = this.edges.map(node =>{
        return (node[0] === `x${start}` && node[1] === `x${random}`) || (node[1] === `x${start}` && node[0] === `x${random}`)
      })

      if(random !== start && !isIn.includes(true)){
        this.edges.push([`x${start}`,`x${random}`, distance]);

        distances.push(
          <div key={start+2250} className="col-2">
            <span style={{color:'red'}}>{`x${start}-x${random}: `}</span>
            { distance }km
          </div>
        )
      }
    }

    this.nodes.push(`x${n}`)
    return distances;
  }

/**
 * render function
 * 
 * @returns {object}
 * 
 * @memberof App
 */
  render() {
    return (
      <div className="container">
        <div className="row px-0 py-3" style={{backgroundColor: 'gray'}}>
          <div className="col-4 d-flex justify-content-start"> TIPE OULIDI OMALI Sara</div>
          <div className="col-4 d-flex justify-content-center"> Juin 2017</div>
          <div className="col-4 d-flex justify-content-end"> CPGE Al-Cachy Fès-Maroc</div>
        </div>
        <div className="row px-0" style={{backgroundColor: 'gray'}}>
          <div className="col-12 d-flex justify-content-center">Impact du hasard et des contraintes sur l'optimalité</div>
        </div>
        <div className="row px-0" style={{backgroundColor: 'gray'}}>
          <div className="col-12 d-flex justify-content-center">Cas du voyageur de commerce</div>
        </div>
        <div className="row px-0 py-3" style={{backgroundColor: 'green'}}>
          <div className="col-6 d-flex justify-content-start"> Le nombre de villes</div>
        </div>
        <div className="row pb-2" style={{backgroundColor: 'green'}}>
          <div className="col-offset-8 col-2 d-flex justify-content-start">
            <select value={this.state.nombreVille} onChange={this.handleInputChange}>
              <option value="3">3</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="2250">2250</option>
            </select>
          </div>
        </div>
        <div className="container-fluid mx-0"  style={{backgroundColor: 'yellow'}}>
          <div className="row px-0 py-3">
            <div className="col-6 d-flex justify-content-start"> La distance entre les villes</div>
          </div>
          <div className="row d-flex justify-content-start">
            {
              this.renderDistance(this.state.nombreVille)
            }
          </div>
        </div>
        {/*<Dijkstra EdgesList={[]}/>
        <Prim EdgesList={[]}/>*/}
        <Kruskal edgeList={this.edges} nodeList={this.nodes}/>
      </div>
    );
  }
}