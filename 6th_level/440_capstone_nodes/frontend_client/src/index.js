import ReactDOM from 'react-dom';
import { NodeContextProvider, useNodeContext } from './contexts/NodeContext';
import { Node } from './components/Node';


const App = () => {
  const { allNodes, setAllNodes } = useNodeContext();
  const topNode = allNodes.find(obj => typeof obj.parent === "undefined");
  return <Node nodeId={topNode._id} />
}

ReactDOM.render(<>
  <link rel="stylesheet" href="/index.css" type="text/css" />
  <NodeContextProvider>
    <App />
  </NodeContextProvider>
</>, document.getElementById('root')
);
