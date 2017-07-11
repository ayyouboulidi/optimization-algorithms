import React, { Component } from 'react';
import { forceBrute } from './forcebrute';

export default class ForceBrute extends Component{
    render(){
        let t0 = performance.now();
        let pluspro = forceBrute(this.props.nodeList, this.props.edgeList);
        let total = 0;
        pluspro.forEach(e=>{total +=e.distance})
        let t1 = performance.now();
        return (
            <div className="col-6 component">
                Force brute (temps d'execution): {parseFloat(t1-t0).toFixed(2)} ms
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
                <hr/>
                {pluspro.length >1 ?
                    <div className="row">
                        Distance: {total} km
                    </div>:null
                }
            </div>
        )
    }
}