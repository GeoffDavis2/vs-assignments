import ReactDOM from 'react-dom';
import { NodeContextProvider, useNodeContext } from './contexts/NodeContext';
import { Node } from './components/Node';


const App = () => {
  const { allNodes } = useNodeContext();
  const topNode = allNodes.find(obj => typeof obj.parent === "undefined");
  return <Node thisNode={topNode} />
}

ReactDOM.render(<>
  <link rel="stylesheet" href="/index.css" type="text/css" />
  <NodeContextProvider>
    <App />
  </NodeContextProvider>
</>, document.getElementById('root')
);
