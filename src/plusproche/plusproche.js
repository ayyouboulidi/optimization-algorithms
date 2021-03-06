/**
 * plus proche voisin
 * 
 * 
1)start on an arbitrary vertex as current vertex.
2)find out the shortest edge connecting current vertex and an unvisited vertex V.
3)set current vertex to V.
4)mark V as visited.
5)if all the vertices in domain are visited, then terminate.
6)Go to step 2.
 */

import { filter, indexOf, uniq, sortBy, includes } from 'lodash';

export function plusproche (nodes, edges){
	let visited = [nodes[0]]
	let list = [];
	let i = 0;
	while(visited.length < nodes.length && i < 10){
		let actual = visited[visited.length-1];
		let filtered = filter(edges, edge => {
			return (edge[0] === actual && indexOf(visited,edge[1]) < 0) || (edge[1] === actual && indexOf(visited,edge[0]) < 0 );
		})

		let sort = sortBy(filtered, filt => filt[2]);

		if(sort.length > 0){
			visited.push(sort[0][0], sort[0][1]);
			let start = '';
			let arrive = '';
			if(list.length > 0 ){
				start = list[list.length-1].arrive;
			} else {
				if (sort[0][0] > sort[0][1] ) {
					start = sort[0][1]
				} else {
					start = sort[0][0]
				}
			}

			if(list.length === 0 ) {
				if (sort[0][0] > sort[0][1] ) {
					arrive = sort[0][0]
				} else {
					arrive = sort[0][1]
				}
			} else {
				if(list[list.length-1].arrive === sort[0][0]){
					arrive = sort[0][1]
				} else {
					arrive = sort[0][0]
				}
			}
			list.push({start, arrive, distance: sort[0][2]})
		} 
		visited = uniq(visited);

		i++;

	}

	const e = exist(edges,'x1',list[list.length-1].arrive);
	if(e.exist){
		list.push({start: list[list.length-1].arrive, arrive: 'x1', distance: e.distance})
	}

	console.log(list, nodes, list.length === nodes.length)

	let cycle = list.length === nodes.length;


	// for(let j=0;j<list.length;j++){
	// 	if(list[j].start === `x${nodes.length}` && list[j].arrive === 'x1') cycle=true;
	// }

	if(cycle){
		return list
	}
	else {
		return [{start: '', arrive: '', distance: 'Pas de cycle avec ce cas'}]
	}

}

function exist(edges, el1, el2) {
	let exist = {exist:false, distance: 0};
	for(let i=0; i<edges.length; i++){
		if(edges[i].indexOf(el1)>=0 && edges[i].indexOf(el2)>=0){
			exist.exist = true;
			exist.distance = edges[i][2];
		}
	}

	return exist;
}





/*
DIJSKTRA
(Données: X, U, I, T, d, s; résultats: Π, A)
 
0) S :={s}; Π (s) :=0 ; A(s) :=-1; xpivot :=s; Π (x) := + ∞ pour tout x ϵ X, x ≠ s ;
1) Tantque S ≠ X et Π(xpivot) < ∞ faire
        pour tout u ϵ U tel que I(u) = xpivot et T(u)  ∉ S faire
            x :=T(u)
            si Π(x) > Π(xpivot) + d(u) alors
                Π (x) := Π (xpivot) + d(u); A(x) : = u;
            finsi
        fin pourtout
        choisir x ∉ S tel que Π (x) = Min[Π (y)] avec y ∉ S ;
        xpivot := x ; S :=S U {xpivot};
     FinTantque






     var map = {a:{b:3,c:1},b:{a:2,c:1},c:{a:4,b:1}},
			    graph = new Graph(map);
			console.log(graph.findShortestPath('a', 'b'));
			console.log(graph.findShortestPath('a', 'c'));
			console.log(graph.findShortestPath('b', 'a'));
			console.log(graph.findShortestPath('b', 'c', 'b'));
			console.log(graph.findShortestPath('c', 'a', 'b'));
			console.log(graph.findShortestPath('c', 'b', 'a'));


var Graph = (function (undefined) {

	var extractKeys = function (obj) {
		var keys = [], key;
		for (key in obj) {
		    Object.prototype.hasOwnProperty.call(obj,key) && keys.push(key);
		}
		return keys;
	}

	var sorter = function (a, b) {
		return parseFloat (a) - parseFloat (b);
	}

	var findPaths = function (map, start, end, infinity) {
		infinity = infinity || Infinity;

		var costs = {},
		    open = {'0': [start]},
		    predecessors = {},
		    keys;

		var addToOpen = function (cost, vertex) {
			var key = "" + cost;
			if (!open[key]) open[key] = [];
			open[key].push(vertex);
		}

		costs[start] = 0;

		while (open) {
			if(!(keys = extractKeys(open)).length) break;

			keys.sort(sorter);

			var key = keys[0],
			    bucket = open[key],
			    node = bucket.shift(),
			    currentCost = parseFloat(key),
			    adjacentNodes = map[node] || {};

			if (!bucket.length) delete open[key];

			for (var vertex in adjacentNodes) {
			    if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
					var cost = adjacentNodes[vertex],
					    totalCost = cost + currentCost,
					    vertexCost = costs[vertex];

					if ((vertexCost === undefined) || (vertexCost > totalCost)) {
						costs[vertex] = totalCost;
						addToOpen(totalCost, vertex);
						predecessors[vertex] = node;
					}
				}
			}
		}

		if (costs[end] === undefined) {
			return null;
		} else {
			return predecessors;
		}

	}

	var extractShortest = function (predecessors, end) {
		var nodes = [],
		    u = end;

		while (u !== undefined) {
			nodes.push(u);
			u = predecessors[u];
		}

		nodes.reverse();
		return nodes;
	}

	var findShortestPath = function (map, nodes) {
		var start = nodes.shift(),
		    end,
		    predecessors,
		    path = [],
		    shortest;

		while (nodes.length) {
			end = nodes.shift();
			predecessors = findPaths(map, start, end);

			if (predecessors) {
				shortest = extractShortest(predecessors, end);
				if (nodes.length) {
					path.push.apply(path, shortest.slice(0, -1));
				} else {
					return path.concat(shortest);
				}
			} else {
				return null;
			}

			start = end;
		}
	}

	var toArray = function (list, offset) {
		try {
			return Array.prototype.slice.call(list, offset);
		} catch (e) {
			var a = [];
			for (var i = offset || 0, l = list.length; i < l; ++i) {
				a.push(list[i]);
			}
			return a;
		}
	}

	var Graph = function (map) {
		this.map = map;
	}

	Graph.prototype.findShortestPath = function (start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return findShortestPath(this.map, start);
		} else if (arguments.length === 2) {
			return findShortestPath(this.map, [start, end]);
		} else {
			return findShortestPath(this.map, toArray(arguments));
		}
	}

	Graph.findShortestPath = function (map, start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return findShortestPath(map, start);
		} else if (arguments.length === 3) {
			return findShortestPath(map, [start, end]);
		} else {
			return findShortestPath(map, toArray(arguments, 1));
		}
	}

	return Graph;

})();*/