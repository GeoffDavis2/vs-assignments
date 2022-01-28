
// import ReactDOM from 'react-dom';
// import { useEffect, useRef, createRef, forwardRef, useCallback } from 'react';
import { useNodeContext } from '../contexts/NodeContext';
// import useAllKeysPress from './useAllKeysPress';


// TODO - Move which is selected up/down
// TODO     either "Map" Up/Down arrow to also send Tab/Shift Tab keystroke
// TODO     or use ref/focus plus setselection to move cursor to End/Beginning
// TODO - Move the selected node up/down
// TODO - Move the selected node in/out
// TODO - Add collapse/expand children


// TODO - Add SVG icons: Todo, Done, Bullet, plain text (with invisible icon)
// TODO - Add way to change type (bullet, todo, plain text)
// TODO - Add login, logout, signup, password encryption
// TODO - Add reminder
// TODO - Add speak reminder
// TODO - Look at proposal for more
// TODO - Put this on actual public website to see how well it works


export const Node = ({ nodeId }) => {
    const { allNodes, setAllNodes, selected, setSelected, saveToDB, dynamicSort } = useNodeContext();
    const thisNodeNdx = allNodes.findIndex(obj => obj._id === nodeId);
    const thisNode = allNodes[thisNodeNdx];

    return <div style={{ marginLeft: 20 }}>
        <input
            placeholder="Node Title"
            className="input-field"
            value={thisNode.title}
            onKeyDown={(e) => {
                if (e.key === 'ArrowDown' && e.shiftKey & e.altKey) console.log("Pressed Shift-Alt-DownArrow");
            }}
            onChange={({ target: { value } }) => setAllNodes(prev => {
                prev[thisNodeNdx].title = value;
                saveToDB(nodeId, { title: value }); // Sends API put call on every keystroke
                return [...prev];
            })}
        />
        {thisNode.children && thisNode.children.sort(dynamicSort('sort')).map((id) => <div key={id}>
            <Node nodeId={id} />
        </div>)}
    </div>
};