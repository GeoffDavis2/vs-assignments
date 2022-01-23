import { useNodeContext } from '../contexts/NodeContext';

// TODO - Add Selected Node and key listening
// TODO - Click to select
// TODO - Move which is selected up/down
// TODO - On selection, make cursor go to end of line
// TODO - Move the selected node up/down
// TODO - Move the selected node in/out
// TODO - Add collapse/expand children


// TODO - Make send update to backend server on every change (just changed object)
// TODO - Add SVG icons: Todo, Done, Bullet, plain text (with invisible icon)
// TODO - Add way to change type (bullet, todo, plain text)
// TODO - Add login, logout, signup, password encryption
// TODO - Add reminder
// TODO - Add speak reminder
// TODO - Look at proposal for more
// TODO - Put this on actual public website to see how well it works



export const Node = (props) => {
    const { allNodes, setAllNodes } = useNodeContext();
    const thisNodeNdx = allNodes.findIndex(obj => obj._id === props.nodeId);
    const thisNode = allNodes[thisNodeNdx];

    return <div style={{ marginLeft: 20 }}>
        <input placeholder="Node Title" className="input-field" value={thisNode.title}
            onChange={({ target: { value } }) => setAllNodes(prev => {
                prev[thisNodeNdx].title = value;
                return [...prev];
            })} />
        {thisNode.children && thisNode.children.map((obj) => <div key={obj}>
            <Node nodeId={obj} recLev={props.recLev + 1} />
        </div>)}
    </div>
};