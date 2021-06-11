match p=(n)-[r]->(m) 
with p limit 10
with 
[
  node in apoc.coll.toSet(apoc.coll.flatten(collect(nodes(p)))) | 
  apoc.map.merge({ id: toString(id(node)), labels: labels(node) }, properties(node)) 
] as allNodes,
[
  rel IN apoc.coll.toSet(apoc.coll.flatten(collect(relationships(p)))) | 
  { 
    source: toString(id(startNode(rel))), 
    target: toString(id(endNode(rel))), 
    type: type(rel), 
    id: toString(id(rel))
  }
] as allRels

  return { 
    nodes: allNodes,
    links: allRels
  } as result;