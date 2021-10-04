import { Task as TaskState, changeTaskState } from "../reducers/BoardSlice";
import "./Task.css";
import { useAppDispatch } from "../app/hooks";
interface TaskProps {
    isCompleted?: boolean;
    listId: string;
    boardId: string;
    task: TaskState;
    id: string;
    handleDragOver;
    handleDrop;
    handleDragging;
}

const Task = (props: TaskProps) => {
    const dispatch = useAppDispatch();
    const handleTaskStateChange = () => {
        dispatch(changeTaskState({ listId: props.listId, boardId: props.boardId, taskId: props.task.id }))
    }


    return <div className="task-wrapper" draggable onDrag={props.handleDragging} onDragOver={props.handleDragOver} onDrop={props.handleDrop} id={props.id}>
        <div className="task-label">
            {props.isCompleted ? <div className="checkmark" onClick={handleTaskStateChange}>&#x2714;</div> : <div className="fake-radio" onClick={handleTaskStateChange}></div>}

            <span className={props.isCompleted ? "completed" : ""}>{props.task.text}</span>
        </div>
        <span className="delete-task">X</span>
    </div>
}

export default Task;