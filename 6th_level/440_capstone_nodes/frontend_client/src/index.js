import ReactDOM from 'react-dom';
import { NodeContextProvider, useNodeContext } from './contexts/NodeContext';
import { Node } from './components/Node';


const App = () => {
  const { allNodes } = useNodeContext();
  // const topNode = allNodes.find(obj => typeof obj.parent === "undefined");
  // return <Node nodeId={topNode._id} />
  return <>
    <Node nodeId={allNodes[0]._id} />
    {allNodes[1] && <Node nodeId={allNodes[1]._id} />}
    {allNodes[2] && <Node nodeId={allNodes[2]._id} />}
    {allNodes[3] && <Node nodeId={allNodes[3]._id} />}
    {allNodes[4] && <Node nodeId={allNodes[4]._id} />}
    {/* <Node nodeId={allNodes[1]._id || allNodes[0]._id} /> */}
  </>
}

ReactDOM.render(<>
  <link rel="stylesheet" href="/index.css" type="text/css" />
  <NodeContextProvider>
    <App />
  </NodeContextProvider>
</>, document.getElementById('root')
);
