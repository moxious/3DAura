import React from 'react';

// https://github.com/vasturiano/react-force-graph
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

function graphit() {
  const N = 500;
  const gData = {
    nodes: [...Array(N).keys()].map(i => ({ id: i, text: 'A' })),
    links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        source: id,
        target: Math.round(Math.random() * (id - 1))
      }))
  };

  console.log(gData);
  return gData;
}
  
function ThreeDGraph(props) {
  return (
    <div id='container'>
      <ForceGraph3D graphData={props.graph || graphit()} 
                nodeAutoColorBy="group"
          nodeThreeObject={node => {
            const sprite = new SpriteText(node.text);
            sprite.color = node.color;
            sprite.textHeight = 8;
            return sprite;
          }}
      
      />
    </div>
  );
}

export default ThreeDGraph;