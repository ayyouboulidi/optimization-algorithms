import React, { Component } from 'react';
import Plusproche from './plusproche';
//import Prim from './prim';
import Kruskal from './kruskal';
import { sortBy } from 'lodash';
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
    }

    for(start = 1; start <= n; start++){
      let random = parseInt(Math.random()*( n - 1) + 1, 10);
      const distance = parseInt(Math.random()*(900 - 40) + 40, 10);

      let isIn = this.edges.map(node =>{
        return (node[0] === `x${start}` && node[1] === `x${random}`) || (node[1] === `x${start}` && node[0] === `x${random}`)
      })

      if(random !== start && !isIn.includes(true)){
        this.edges.push([`x${start}`,`x${random}`, distance]);
      }
    }

    let sortedEdges = sortBy(this.edges, edge =>  -edge[2] );

    sortedEdges.forEach((edge, key) => {
      distances.push(
        <div key={key} className="col-4">
          {`${edge[0]}`}<img src="/between.png" style={{width:'12px'}}/>{`${edge[1]}`} : 
          <span style={{fontSize:'13px' }}>{`${edge[2]}km`}</span>
        </div>
      )
    });

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
        <div className="row px-0 py-3" style={{backgroundColor: '#0277bd', color:'#fff'}}>
          <div className="col-4 d-flex justify-content-start"> TIPE OULIDI OMALI Sara</div>
          <div className="col-4 d-flex justify-content-center"> Juin 2017</div>
          <div className="col-4 d-flex justify-content-end"> CPGE Al-Cachy Fès-Maroc</div>
        </div>
        <div className="row px-0" style={{backgroundColor: '#0168a5', color:'#fff', fontWeight: '700'}}>
          <div className="col-12 d-flex justify-content-center">Impact du hasard et des contraintes sur l'optimalité</div>
        </div>
        <div className="row px-0" style={{backgroundColor: '#0168a5', color:'#fff', fontWeight: '700'}}>
          <div className="col-12 d-flex justify-content-center">Cas du voyageur de commerce</div>
        </div>
        <div className="row py-2" style={{backgroundColor: '#f8f8f8'}}>
          <div className="col-6 d-flex justify-content-start"> 
            Le nombre de villes 
            <select value={this.state.nombreVille} onChange={this.handleInputChange}>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <div className="row component">
          <div className="col-12 d-flex justify-content-start">
             La distance entre les villes
          </div>
            {
              this.renderDistance(this.state.nombreVille)
            }
        </div>
        <div className="row">
        {/*<Dijkstra EdgesList={[]}/>
        <Prim EdgesList={[]}/>*/}
        
          <Kruskal edgeList={this.edges} nodeList={this.nodes}/>
          <Plusproche edgeList={this.edges} nodeList={this.nodes}/>
          <Kruskal edgeList={this.edges} nodeList={this.nodes}/>
        </div>
      </div>
    );
  }
}