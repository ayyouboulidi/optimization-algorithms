/*
function algorithm TSP (G, n)
  for k := 2 to n do
    C({k}, k) := d1,k
  end for

  for s := 2 to n-1 do
    for all S ⊆ {2, . . . , n}, |S| = s do
      for all k ∈ S do
        {C(S, k) = minm≠k,m∈S [C(S − {k}, m) + dm,k ]}
      end for
    end for
  end for

  opt := mink≠1 [C({2, 3, . . . , n}, k) + dk,1]
  return (opt)
end

*/
/*
function tsp(edges, nodes) {
    for(let k=2; k <= nodes.length; k++){

    }

    for(let s=2; s<n;s++){
        for()
    }
}*/