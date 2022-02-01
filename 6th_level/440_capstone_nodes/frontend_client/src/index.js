import ReactDOM from 'react-dom';
import { NodeContextProvider, useNodeContext } from './contexts/NodeContext';
import { LoginSignup } from './components/loginSignup';
import { Node } from './components/Node';


const App = () => {
  const { allNodes, token, logout, user:{username} } = useNodeContext();
  const topNode = allNodes.find(obj => typeof obj.parent === "undefined");
  return (token && allNodes.length > 0) ? <>
    <div className='logout'>{username}&nbsp;&nbsp;&nbsp;<button onClick={() => logout()}>Logout</button></div>
    <Node thisNode={topNode} />
  </>
    : <LoginSignup />
}

ReactDOM.render(<>
  <link rel="stylesheet" href="/index.css" type="text/css" />
  <NodeContextProvider>
    <App />
  </NodeContextProvider>
</>, document.getElementById('root')
);
