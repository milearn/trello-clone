import './List.css';
import { List as ListState, deleteList, addTask, Task as TaskState, changeOrderTask } from "../reducers/BoardSlice";
import Input from './Input';
import KebabMenu from './KebabMenu';
import Task from './Task';
import { useAppDispatch } from '../app/hooks';
import { useState } from 'react';
interface ListProps {
    list: ListState;
    boardId: string;
}
const List = (props: ListProps) => {
    const [showCompleted, setShowCompleted] = useState(true);
    const dispatch = useAppDispatch();
    let currentId, targetId;
    const handleDeleteList = () => {
        dispatch(deleteList({ listId: props.list.id, boardId: props.boardId }))
    }
    const handleAddTask = (text) => {
        dispatch(addTask({
            boardId: props.boardId,
            listId: props.list.id,
            text
        }))
    };
    const incompleteTasks = props.list?.tasks?.filter((task) => {
        return !task.isCompleted
    })
    const completeTasks = props.list?.tasks?.filter((task) => {
        return task.isCompleted
    })
    const handleDragging = (e) => {
        currentId = e.target.id;
        // e.dataTransfer.setData("currentId", e.target.id);
    }
    const handleDragOver = (e) => {
        e.preventDefault();
        targetId = e.target.closest('.task-wrapper').id;
    }
    const handleDrop = (e) => {
        const newList = [...props.list.tasks];
        const currentIndex = props.list.tasks.findIndex((task) => task.id === currentId);
        const targetIndex = props.list.tasks.findIndex((task) => task.id === targetId);
        const item = newList.splice(currentIndex, 1);
        newList.splice(targetIndex, 0, item[0])
        dispatch(changeOrderTask({
            boardId: props.boardId,
            listId: props.list.id,
            taskArr: newList
        }))
    }
    const renderTask = (tasks: TaskState[], isCompleted) => {
        return tasks?.map(task => <Task key={task.id} boardId={props.boardId} listId={props.list.id} task={task} isCompleted={isCompleted} id={task.id} handleDragging={handleDragging} handleDragOver={handleDragOver} handleDrop={handleDrop} />)
    }

    return <div className="list-wrapper">
        <div className="list-header">
            <h3>{props.list.name}</h3>
            <KebabMenu>
                <span className="delete-list" onClick={handleDeleteList}>Delete</span>
            </KebabMenu>
        </div>
        <Input placeholder="Add new task" onSubmit={handleAddTask} />
        <div className="task-container">
            {!!incompleteTasks?.length && <div className="incomplete-task">{renderTask(incompleteTasks, false)}</div>}
            {!!completeTasks?.length && <div className="complete-task">
                <div className="complete-task-header" onClick={() => setShowCompleted(!showCompleted)}>
                    <span>Completed({completeTasks.length})</span> <span className={`arrow ${showCompleted ? 'up' : 'down'}`}></span>
                </div>
                <div className={`complete-task-list ${showCompleted ? "show" : "hide"}`}>

                    {renderTask(completeTasks, true)}
                </div>
            </div>}

        </div>
    </div>
}

export default List;