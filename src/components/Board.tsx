import { BoardState, deleteBoard, addList } from "../reducers/BoardSlice";
import "./Board.css";
import KebabMenu from './KebabMenu';
import { useAppDispatch } from "../app/hooks";
import Input from "./Input";
import List from './List';
interface BoardProps {
    board: BoardState;
}

const Board = (props: BoardProps): React.ReactElement => {
    const { name, id, lists } = props.board;
    const dispatch = useAppDispatch();
    const renderList = (list) => <List key={list.id} list={list} boardId={id} />
    const handleDeleteBoard = () => {
        dispatch(deleteBoard(id))
    }
    const handleListAddition = (name) => {
        dispatch(addList({ id, name }));
    }
    return <div className="board-container">
        <div className="board-header">
            <h2>{name}</h2>
            <KebabMenu>
                <span className="delete-board" onClick={handleDeleteBoard}>Delete</span>
            </KebabMenu>
        </div>
        <div className="list-container">
            {lists?.map(renderList)}
            <div><Input placeholder="Add new list" onSubmit={handleListAddition} /></div>
        </div>

    </div>
}
export default Board