import boardSlice, {
    BoardState,
    addBoard,
    deleteBoard,
    addList,
} from './BoardSlice';

describe('board reducer', () => {
    const initialState: BoardState[] = [];
    let store: BoardState[];
    it('should handle initial state', () => {
        expect(boardSlice(undefined, { type: 'unknown' })).toEqual([]);
    });

    it('should handle adding board', () => {
        const actual = boardSlice(initialState, addBoard('first board'));
        store = actual;
        expect(actual.length).toEqual(1);
        expect(actual[0].name).toEqual('first board')
    });
    it('should handle delete board', () => {
        const actual = boardSlice(store, deleteBoard(store[0].id));
        expect(actual.length).toEqual(0);
    })

    // it('should handle decrement', () => {
    //   const actual = boardSlice(initialState, decrement());
    //   expect(actual.value).toEqual(2);
    // });

    // it('should handle incrementByAmount', () => {
    //   const actual = boardSlice(initialState, incrementByAmount(2));
    //   expect(actual.value).toEqual(5);
    // });
});
