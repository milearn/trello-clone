import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
export interface BoardState {
    id: string;
    name: string;
    lists?: List[]
}
export interface List {
    id: string;
    name: string;
    tasks?: Task[]
}
export interface Task {
    id: string;
    text: string;
    isCompleted: boolean;
};

export const initialState: BoardState[] = [];
export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addBoard: (state: BoardState[], action: PayloadAction<string>) => {
            state.push({
                id: nanoid(),
                name: action.payload
            })
            return state;
        },
        deleteBoard: (state: BoardState[], action: PayloadAction<string>) => {
            return state.filter((board) => {
                return board.id !== action.payload
            })
        },
        addList: (state: BoardState[], action: PayloadAction<{ id: string; name: string }>) => {
            const { id, name } = action.payload;
            state.forEach((board) => {
                const listObj: List = {
                    id: nanoid(),
                    name,
                }
                if (board.id === id) {
                    if (board.lists) {
                        board.lists.push(listObj);
                    } else {
                        board.lists = [
                            listObj
                        ]
                    }
                }
            });
            return state;
        },
        deleteList: (state: BoardState[], action: PayloadAction<{ boardId: string; listId: string }>) => {
            const { boardId, listId } = action.payload;
            state.forEach((board) => {
                if (board.id === boardId) {
                    board.lists = board.lists.filter((list) => {
                        return list.id !== listId;
                    })
                }
            });
            return state;
        },
        addTask: (state: BoardState[], action: PayloadAction<{ boardId: string; listId: string; text: string }>) => {
            const { boardId, listId, text } = action.payload;
            const taskObj: Task = {
                id: nanoid(),
                text,
                isCompleted: false
            }
            state.forEach((board) => {
                if (board.id === boardId) {
                    board?.lists?.forEach((list) => {
                        if (list.id === listId) {
                            if (list.tasks) {
                                list.tasks.push(taskObj);
                            } else {
                                list.tasks = [
                                    taskObj
                                ]
                            }
                        }
                    })
                }
            });
            return state;
        },
        deleteTask: (state: BoardState[], action: PayloadAction<{ boardId: string; listId: string; taskId: string }>) => {
            const { boardId, listId, taskId } = action.payload;
            state.forEach((board) => {
                if (board.id === boardId) {
                    board.lists.forEach((list) => {
                        if (list.id === listId) {
                            list.tasks = list.tasks.filter((task) => {
                                return task.id !== taskId
                            })
                        }
                    })
                }
            })
            return state;
        },
        changeTaskState: (state: BoardState[], action: PayloadAction<{ boardId: string; listId: string; taskId: string }>) => {
            const { boardId, listId, taskId } = action.payload;
            state.forEach((board) => {
                if (board.id === boardId) {
                    board.lists.forEach((list) => {
                        if (list.id === listId) {
                            list.tasks = list.tasks.map((task) => {
                                if (task.id === taskId) {
                                    task.isCompleted = !task.isCompleted;
                                }
                                return task;
                            })
                        }
                    })
                }
            })
            return state;
        },
        changeOrderTask: (state: BoardState[], action: PayloadAction<{ boardId: string; listId: string; taskArr: Task[] }>) => {
            const { boardId, listId, taskArr } = action.payload;
            state.forEach((board) => {
                if (board.id === boardId) {
                    board.lists.forEach((list) => {
                        if (list.id === listId) {
                            list.tasks = taskArr;
                        }
                    })
                }
            })
            return state;
        }
    }
})
export const getBoard = (state: RootState): BoardState[] => state.board;

export const { addBoard, deleteBoard, addList, deleteList, addTask, changeTaskState, changeOrderTask } = boardSlice.actions;
export default boardSlice.reducer;


