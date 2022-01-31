import { useNodeContext } from '../contexts/NodeContext';

export const Node = ({ thisNode }) => {
    const {
        allNodes, setAllNodes,
        moveCursor, moveNode, getChildren,
        addNode, delNode, promoteNode, demoteNode,
        setCursorId, updateDBnState
    } = useNodeContext();

    return <div style={{ marginLeft: 20 }}>
        <input
            id={thisNode._id}
            placeholder="Node Title"
            className="input-field"
            value={thisNode.title}
            onKeyDown={(e) => {
                if (e.key === 'ArrowDown' && e.shiftKey && e.altKey) moveNode(thisNode, 1);
                if (e.key === 'ArrowUp' && e.shiftKey && e.altKey) moveNode(thisNode, -1);
                if (e.key === 'ArrowDown' && !e.shiftKey && !e.altKey) moveCursor(thisNode, 1);
                if (e.key === 'ArrowUp' && !e.shiftKey && !e.altKey) moveCursor(thisNode, -1);
                if (e.key === 'ArrowLeft' && e.shiftKey && e.altKey) promoteNode(thisNode);
                if (e.key === 'ArrowRight' && e.shiftKey && e.altKey) demoteNode(thisNode);
                if (e.key === 'Delete' && e.shiftKey && e.altKey) delNode(thisNode);
                if (e.key === 'Enter') addNode(thisNode);
            }}
            onChange={({ target: { value } }) => updateDBnState(thisNode._id, { title: value })}
        />{thisNode.sibSort}
        {getChildren(thisNode, 'sibSort')?.map(obj => <Node thisNode={obj} key={obj._id} />)}
    </div>
};