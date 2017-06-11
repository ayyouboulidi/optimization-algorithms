import React, { Component } from 'react';
import { plusproche } from './plusproche';

export default class PlusPorcheIndex extends Component{
    render(){
        let t0 = performance.now();
        let pluspro = plusproche(this.props.nodeList, this.props.edgeList);
        let t1 = performance.now();
        return (
            <div className="col-6 component">
                Plus proche voisin (temps d'execution): {parseFloat(t1-t0).toFixed(2)} ms
                <hr/>
                <div className="row">
                {
                    pluspro.map( (edge, key) => (
                        <div key={key} className="col-6">
                            {`${edge.start}`}<img src="/between.png" style={{width:'12px'}}/>{`${edge.arrive}`}
                            <span style={{fontSize:'13px' }}>{`${edge.distance}km`}</span>         
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }
}