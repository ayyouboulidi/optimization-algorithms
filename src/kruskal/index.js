import React, { Component } from 'react';
import { kruskal } from './kruskal';

export default class kruskalIndex extends Component{
    render(){
        let t0 = performance.now();
        let krus = kruskal(this.props.nodeList, this.props.edgeList);
        let t1 = performance.now();
        return (
            <div className="fluid-container">
                Kruskal time: {t1-t0} ms
                <div className="row">
                {
                    krus.map( (edge, key) => (
                        <div key={key} className="col-2">
                            <span style={{color:'red'}}>{`${edge[0]}-${edge[1]}: `}</span>
                            { edge[2] }km
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }
}