import React, { Component } from 'react';
import { kruskal } from './kruskal';

export default class kruskalIndex extends Component{
    render(){
        console.log(this.props.edgeList)
        console.log(this.props.nodeList)
        console.log(kruskal(this.props.nodeList, this.props.edgeList))
        return (
            <div className="fluid-container">
                this is the solution for kruskal algo
                <div className="row">
                {kruskal(this.props.nodeList, this.props.edgeList).map( (edge, key) => (
                    <div key={key} className="col-2">
                        <span style={{color:'red'}}>{`${edge[0]}-${edge[1]}: `}</span>
                        { edge[2] }km
                    </div>
                ) )}
                </div>
            </div>
        )
    }
}