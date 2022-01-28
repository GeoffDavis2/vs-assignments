import { useEffect } from "react";
import { useRef } from "react/cjs/react.development";
import { useNodeContext } from '../contexts/NodeContext';


// TODO - Add collapse/expand children
// TODO - Add SVG icons: Todo, Done, Bullet, plain text (with invisible icon)
// TODO - Add way to change type (bullet, todo, plain text)
// TODO - Add reminder
// TODO - Add speak reminder
// TODO - Look at proposal for more
// TODO - Put this on actual public website to see how well it works


// TODO - Add new Child Task
// TODO - Add new Sibling Task
// TODO - Add "delete" node function
// TODO - Handle moving cursor past top/bottom of sibling list
// TODO - Add login, logout, signup, password encryption


export const Node = ({ thisNode }) => {
    const {
        allNodes, setAllNodes, newSelection, setNewSelection,
        moveCursor, saveToDB, moveNode, getChildren, addNode
    } = useNodeContext();
    const ref = useRef(thisNode._id);

    // TODO Is there a better way to make cursor go to begining of input on up/down arrow?
    useEffect(() => {
        ref.current.selectionStart = 0;
        ref.current.selectionEnd = 0;
        setNewSelection(false);
    }, [newSelection]);

    return <div style={{ marginLeft: 20 }}>
        <input
            ref={ref}
            id={thisNode._id}
            placeholder="Node Title"
            className="input-field"
            value={thisNode.title}
            onKeyDown={(e) => {
                if (e.key === 'ArrowDown' && e.shiftKey && e.altKey) moveNode(thisNode, 1);
                if (e.key === 'ArrowUp' && e.shiftKey && e.altKey) moveNode(thisNode, -1);
                if (e.key === 'ArrowDown' && !e.shiftKey && !e.altKey) moveCursor(thisNode, 1);
                if (e.key === 'ArrowUp' && !e.shiftKey && !e.altKey) moveCursor(thisNode, -1);
                if (e.key === 'Enter') addNode(thisNode);
            }}
            onChange={({ target: { value } }) => setAllNodes(prev => {
                prev[allNodes.findIndex(obj => obj._id === thisNode._id)].title = value;
                saveToDB(thisNode._id, { title: value }); // Sends API put call on every keystroke
                return [...prev];
            })}
        />
        {getChildren(thisNode, 'sort')?.map(obj => <Node thisNode={obj} key={obj._id} />)}
    </div>
};