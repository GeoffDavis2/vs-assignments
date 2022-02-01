import { useNodeContext } from '../contexts/NodeContext';

export const Node = ({ thisNode }) => {
    const {
        getChildren, moveCursor, moveNode,
        addFirstNode, addSibNode, addChildNode, delNode,
        promoteNode, demoteNode, updateDBnState
    } = useNodeContext();

    return (!thisNode) ? <button onClick={() => addFirstNode()}>Add 1st Node</button> : <div style={{ marginLeft: 20 }}>
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
                if (e.key === 'Enter' && !e.shiftKey && !e.altKey) addSibNode(thisNode);
                if (e.key === 'Enter' && e.shiftKey && e.altKey) addChildNode(thisNode);
            }}
            onChange={({ target: { value } }) => updateDBnState(thisNode._id, { title: value })}
        />
        {getChildren(thisNode)?.map(obj => <Node thisNode={obj} key={obj._id} />)}
    </div>
};