import React, { useState } from 'react';
import './App.css';
import ThreeDGraph from './components/ThreeDGraph';
import AuraForm from './components/AuraForm';
import neo4j from 'neo4j-driver';

let driver;

const getD3GraphQuery = `
match p=(n)-[r]->(m) 
with p limit 10
with 
[
  node in apoc.coll.toSet(apoc.coll.flatten(collect(nodes(p)))) | 
  apoc.map.merge({ id: toString(id(node)), labels: labels(node), name: node.name }, {} /* properties(node) */) 
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
  `

function App() {
  const [graph, setGraph] = useState(0);

  const onConnect = async state => {
    driver = neo4j.driver(state.uri, neo4j.auth.basic(state.username, state.password));
    console.log(driver);

    const session = driver.session();
    return session.readTransaction(tx => tx.run(getD3GraphQuery))
        .then(result => {
          console.log(result);
          const res = result.records[0].get('result');

          for(let i=0; i<res.nodes.length; i++) {
            res.nodes[i].id = Number(res.nodes[i].id);
          }

          setGraph(res);
          console.log(res);
        });
  }

  return (
    <main>
      <AuraForm onConnect={onConnect}/>
      <ThreeDGraph graph={graph}/>
    </main>
  );
}

export default App;