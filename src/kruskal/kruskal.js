/*0) poser T = ∅, i = 1
1) choisir un arc ai de poids minimum dans G-T ne déterminant aucun cycle avec des arcs de T
2) faire T = T U {xi}, i = i + 1
3) si i < n alors aller en (1) sinon stop.


const nodes = ["A", "B", "C", "D", "E", "F", "G"];
    const edges = [
        ["A", "B", 7], ["A", "D", 5],
        ["B", "C", 8], ["B", "D", 9], ["B", "E", 7],
        ["C", "E", 5],
        ["D", "E", 15], ["D", "F", 6],
        ["E", "F", 8], ["E", "G", 9],
        ["F", "G", 11]
    ];
    
    const res = kruskal(nodes, edges);
    console.log(res);

*/

import {sortBy, map, without, union, isEqual } from 'lodash';


export function kruskal(nodes, edges) {
    const mst = [];
    let forest = map(nodes, node =>  [node] );
    let sortedEdges = sortBy(edges, edge =>  -edge[2] );
    while(forest.length > 1) {
        let edge = sortedEdges.pop();
        let n1 = edge[0],
            n2 = edge[1];

        let t1 = forest.filter(tree => tree.includes(n1) );
            
        let t2 = forest.filter(tree =>  tree.includes(n2) );

        if (!isEqual(t1,t2)) {
            forest = without(forest, t1[0], t2[0]);
            forest.push(union(t1[0], t2[0]));
            mst.push(edge);
        }
    }
    return mst;
}