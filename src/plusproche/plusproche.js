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

import { filter, indexOf, uniq, sortBy } from 'lodash';

export function plusproche (nodes, edges){
	let visited = [nodes[0]]
	let i = 0;
	//while(visited.length < nodes.length || i < 9){
		/*let visite = visited[visited.length-1];
		let filtered = filter(edges, (edge) => {
			return (edge[0] === visite && indexOf(visited,edge[1]) < 0) || (edge[1] === visite && indexOf(visited,edge[0]) < 0 );
		})

		let sort = sortBy(filtered, filt => filt[2]);

		if(sort.length > 0) visited.push(sort[0][0], sort[0][1]);
		visited = uniq(visited)*/

		//i++;

	//}

	return visited;
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