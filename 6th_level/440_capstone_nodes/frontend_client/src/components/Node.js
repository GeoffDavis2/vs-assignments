import { useEffect, useRef, createRef, forwardRef } from 'react';
import { useNodeContext } from '../contexts/NodeContext';
import useAllKeysPress from './useAllKeysPress';

// TODO - Add key listening
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




export const Node = ({nodeId}) => {
    const { allNodes, setAllNodes, selected, setSelected } = useNodeContext();
    const thisNodeNdx = allNodes.findIndex(obj => obj._id === nodeId);
    const thisNode = allNodes[thisNodeNdx];

    // const inputRef = useRef();
    thisNode.ref = useRef();

    const DnArrow = useAllKeysPress({ userKeys: 'ArrowDown' });
    const UpArrow = useAllKeysPress({ userKeys: 'ArrowUp' });
    const ShiftAlt = useAllKeysPress({ userKeys: ['Shift', 'Alt'] });
    useEffect(() => {
    //   if (DnArrow && !ShiftAlt) moveSelectionDn();
    //   if (UpArrow && !ShiftAlt) moveSelectionUp();
    //   if (DnArrow && ShiftAlt) moveSelectedDn();
    //   if (UpArrow && ShiftAlt) moveSelectedUp();
      if (UpArrow && !ShiftAlt) {
        //   inputRef.current.focus();
        allNodes[2].ref.current.focus();
      };
    // eslint-disable-next-line
    }, [DnArrow, UpArrow, ShiftAlt])

    return <div style={{ marginLeft: 20 }}>
        <input
            ref={thisNode.ref}
            placeholder="Node Title"
            // style={{ backgroundColor: (thisNode._id === selected) ? "grey" : "black" }}
            className="input-field"
            value={thisNode.title}
            onClick={() => setSelected(thisNode._id)}
            onChange={({ target: { value } }) => setAllNodes(prev => {
                prev[thisNodeNdx].title = value;
                return [...prev];
            })} />
        {/* {thisNode.children && thisNode.children.map((obj) => <div key={obj}>
            <Node nodeId={obj}/>
        </div>)} */}
    </div>
};