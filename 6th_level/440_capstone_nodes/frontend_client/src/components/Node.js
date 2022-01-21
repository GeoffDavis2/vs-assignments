import { NodeContextProvider, useNodeContext } from '../contexts/NodeContext';
// import { Node } from '.Node'; 


export const Node = (props) => {
    const { allNodes } = useNodeContext();
    const thisNode = props.node;

    // TODO If all this does it find the object, then just do it in the map below....
    const getChildNode = (nodeId) => {
        return allNodes.find(obj => obj._id === nodeId)
    }
    // const thisNode = allNodes.find(obj => obj._id === props.nodeId);
    return <div style={{ marginLeft: 20 }}>
        <p>{thisNode.title}</p>
        {/* <button>Up 1 Level</button><button>Top Level</button><button onClick={addChild}>Add Node</button> */}
        {thisNode.children && (thisNode.children.length > 0) && thisNode.children.map((obj) => <div key={obj}>
            <Node node={getChildNode(obj)} recLev={props.recLev + 1} />
        </div>)}
    </div>
};