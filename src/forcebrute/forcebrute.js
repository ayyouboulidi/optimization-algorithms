
import {isEqual, uniqWith} from 'lodash';

function exist(edges, el1) {
	let exist = [];
	for(let i=0; i<edges.length; i++){
		if(edges[i].indexOf(el1)>=0){
            exist.push({
                start: edges[i][0],
                arrive: edges[i][1],
                distance: edges[i][2]
            })
		}
	}

	return exist;
}

function routes(edges, nodes) {
    let route = [];

    switch(nodes.length){
        case 3:
            let tt = exist(edges, nodes[0])
            tt.forEach(el =>{
                route.push([el])
            })
            route.forEach((e, index) => {
                let second = exist(edges, e[0].arrive)
                second.forEach(kk => {if(!isEqual(e[0],kk)) route[index].push(kk)})
            });
            route.forEach((e, index) => {
                let finish = exist(edges, e[e.length-1].arrive)
                finish.forEach(gg => {if(!isEqual(e[e.length-1],gg)) route[index].push(gg)})
            });
            break;
        case 5:
            let kaka = exist(edges, nodes[0])
            kaka.forEach(el =>{
                route.push([el])
            })
            route.forEach((e, index) => {
                let second = exist(edges, e[0].arrive)
                second.forEach(rr =>{if(!isEqual(e[0],rr)) route[index].push([rr])})
            });
            route.forEach((e, index) => {
                e.forEach((a,i) =>{
                    if(i !== 0)
                    {
                        let third = exist(edges, a[0].arrive)
                        third.forEach(zz =>{if(!isEqual(a[0],zz)) route[index][i].push([zz])})
                    }
                })
            });
            route.forEach((e, index) => {
                e.forEach((a,i) =>{
                    if(i !== 0)
                    {
                        a.forEach((b,c) => {
                            if(c !== 0){
                                let fourth = exist(edges, b[0].arrive)
                                fourth.forEach(oo =>{if(!isEqual(b[0],oo)) route[index][i][c].push([oo])})
                            }
                        })
                    }
                })
            });
            route.forEach((e, index) => {
                e.forEach((a,i) =>{
                    if(i !== 0)
                    {
                        a.forEach((b,c) => {
                            if(c !== 0){
                                b.forEach((g,f) => {
                                    if(f !== 0){
                                        let fifth = exist(edges, g[0].arrive)
                                        fifth.forEach(yy => {if(!isEqual(g[0],yy)) route[index][i][c][f].push(yy)})
                                    }
                                })
                            }
                        })
                    }
                })
            });
            break;
        default: 
           break;
    }

    return route
}

function flatten(arr) {
  const flat = [].concat(...arr);
  return flat.some(Array.isArray) ? flatten(flat) : flat;
}


export function forceBrute(nodes, edges){
    let r = routes(edges, nodes);
    let distance = {d: Infinity,index: -1, i: -1, j: -1, c: -1, k: -1};
    let tmp = 0;

    switch(nodes.length){
        case 3:
            r.forEach((e, index) => {
                if(e.length === 3) {
                    e.forEach(s => tmp += s.distance)
                    if(tmp < distance.d) {
                        distance.d = tmp;
                        distance.index = index;
                    }
                }
            });
            break;
        case 5:
            r.forEach((e, index) => {
                if(e.length > 1) {
                    e.forEach((b, i) =>{
                        if(b.length > 1) {
                            b.forEach((c,j) =>{
                                if(c.length > 1) {
                                    c.forEach((rr,k) => {
                                        if(rr.length+3 === nodes.length) {
                                            tmp = r[index][0].distance + r[index][i][0].distance+ r[index][i][j][0].distance
                                            let psps = 0
                                            rr.forEach(s => psps += s.distance)
                                            tmp += psps
                                            

                                            if(tmp < distance.d) {
                                                distance.d = tmp;
                                                distance.index = index;
                                                distance.i = i;
                                                distance.j = j;
                                                distance.k = k;
                                            }
                                        } else {
                                            tmp = Infinity
                                        }
                                    })
                                } else {
                                    tmp = Infinity
                                }
                            })
                        } else {
                            tmp = Infinity
                        }
                    })
                } else {
                    tmp = Infinity
                }
            });
            break;
        default:
            break;

    }

    if(distance.index !== -1) {
        let tt = []
        if(nodes.length === 5){
            tt = tt.concat(r[distance.index][distance.i][distance.j][distance.k])
            tt.push(r[distance.index][distance.i][distance.j][0])
            tt.push(r[distance.index][distance.i][0])
            tt.push(r[distance.index][0])
        } else {
            tt = tt.concat(r[distance.index])
        }

        return tt

    } else {
        return [{start: '', arrive: '', distance: 'Pas de cycle pour ce cas'}];
    }

}
// function existRoutes(edges,nodes,routes) {

	
// }


// function rFact(num)
// {
//     if (num === 0)
//       { return 1; }
//     else
//       { return num * rFact( num - 1 ); }
// }






/*0) Poser T = ∅;
1) 
- Si G ne comporte qu'un sommet, terminer (X, T) est un arbre de poids minimum.
- Si G comporte plus d'un sommet, soit x un sommet de G, aller en 2).
2) Soit v un arc de G adjacent à x et n’est pas une boucle tel que :
p(v) = Min (p(u))
Pour u ∈A ; u adjacent à x et u n'est pas une boucle
- Poser T := T ∪ {v}, G := Cv ( G ) ;
- Aller en (1) ;
*/

// Represents an edge from source to sink with capacity
/*
var Edge = function(source, sink, capacity) {
    this.source = source;
    this.sink = sink;
    this.capacity = capacity;
};

// Main class to manage the network
var Graph = function() {
    this.edges = {};
    this.nodes = [];
    this.nodeMap = {};
    
    // Add a node to the graph
    this.addNode = function(node) {
        this.nodes.push(node);
        this.nodeMap[node] = this.nodes.length-1;
        this.edges[node] = [];
    };

    // Add an edge from source to sink with capacity
    this.addEdge = function(source, sink, capacity) {
        // Create the two edges = one being the reverse of the other    
        this.edges[source].push(new Edge(source, sink, capacity));
        this.edges[sink].push(new Edge(sink, source, capacity));
    };
    
    // Does edge from source to sink exist?
    this.edgeExists = function(source, sink) {
        if(this.edges[source] !== undefined) 
            for(var i=0;i<this.edges[source].length;i++)
                if(this.edges[source][i].sink == sink)
                    return this.edges[source][i];
        return null;
    };
};

function Prim(graph) {
    var result = [];
    var usedNodes = {};
    
    function findMin(g) {
        var min = [999999,null];
        for(var i=0;i<result.length;i++) 
            for(var n=0;n<g.edges[result[i]].length;n++) 
                if(g.edges[result[i]][n].capacity < min[0] && usedNodes[g.edges[result[i]][n].sink] === undefined)
                    min = [g.edges[result[i]][n].capacity, g.edges[result[i]][n].sink];
        return min[1];
    }
    
    // Pick random start point
    var node = g.nodes[Math.round(Math.random()*(g.nodes.length-1))];
    result.push(node);
    usedNodes[node] = true;
    
    var min = findMin(g);
    while(min != null) {
        result.push(min);
        usedNodes[min] = true;
        min = findMin(g);
    }
    
    return result;
};

var g = new Graph();

g.addNode('a');
g.addNode('b');
g.addNode('c');
g.addNode('d');
g.addNode('e');
g.addNode('f');

g.addEdge('a','b',1);
g.addEdge('b','c',3);
g.addEdge('a','d',3);
g.addEdge('b','d',2);
g.addEdge('d','e',3);
g.addEdge('b','e',6);
g.addEdge('b','f',5);
g.addEdge('c','e',4);
g.addEdge('e','f',2);
g.addEdge('c','f',4);


var result = Prim(g);
document.write('<h2>Result</h2>');
document.write(result);*/