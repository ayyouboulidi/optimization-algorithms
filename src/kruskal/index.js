import React, { Component } from 'react';
import { kruskal } from './kruskal';

export default class kruskalIndex extends Component{
    render(){
        let t0 = performance.now();
        let krus = kruskal(this.props.nodeList, this.props.edgeList);
        let t1 = performance.now();
        return (
            <div className="col-4 component">
                Kruskal time: {parseFloat(t1-t0,10).toFixed(2)} ms
                <hr/>
                <div className="row">
                {
                    krus.map( (edge, key) => (
                        <div key={key} className="col-6">
                            {`${edge[0]}`}<img src="/between.png" style={{width:'12px'}}/>{`${edge[1]}`} : 
                            <span style={{fontSize:'13px' }}>{`${edge[2]}km`}</span>
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }
}