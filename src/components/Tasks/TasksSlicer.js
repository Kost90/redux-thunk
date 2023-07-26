import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const FetchTodos = createAsyncThunk(
    'todos/fetchtodos',
    async function (_, {rejectWithValue}){
        try{
            const response = await fetch ('https://64c19d97fa35860baea0b566.mockapi.io/tasks');

            if(!response.ok){
                throw new Error('Server error')
            }
            const data = await response.json();

            return data
        }
        catch (error){
            return rejectWithValue(error.message);
        }
    }
)

export const DeleteTodo = createAsyncThunk(
    'todos/DeleteTodo',
    async function (id, {rejectWithValue, dispatch}){
        try{
            const response = await fetch (`https://64c19d97fa35860baea0b566.mockapi.io/tasks/${id}`, {
                method:'DELETE',
            });

            if(!response.ok){
                throw new Error('Cant delete')
            }

            dispatch(removetask(id))
        }
        catch (error){
            return rejectWithValue(error.message);
        }
    }
)

export const AddTodo = createAsyncThunk(
    'todos/AddTodo',
    async function (task, {rejectWithValue, dispatch}){
        try{
            const response = await fetch (`https://64c19d97fa35860baea0b566.mockapi.io/tasks`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(task)
            });

            if(!response.ok){
                throw new Error('Cant delete')
            }

            const data = await response.json();

            dispatch(addtask(data))

            return data

           
        }
        catch (error){
            return rejectWithValue(error.message);
        }
    }
)

export const EditTodo = createAsyncThunk(
    'todos/EditTodo',
    async function (task, {rejectWithValue, dispatch}){
        try{
            const response = await fetch (`https://64c19d97fa35860baea0b566.mockapi.io/tasks/${task.id}`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(
                    task
                )
            });

            if(!response.ok){
                throw new Error('Cant delete')
            }

            dispatch(edittask(task))
   
        }
        catch (error){
            return rejectWithValue(error.message);
        }
    }
)

export const TasksSlice = createSlice({
    name:'todos',
    initialState: {
        tasks:[],
        status: null,
        error: null,
    },
    reducers:{
        addtask:(state,action) =>{
            state.tasks.push(action.payload)
        },
        removetask:(state,action) =>{
           state.tasks = state.tasks.filter(task => 
                task.id !== action.payload)
        },
        edittask: (state,action) =>{
            const index = state.tasks.findIndex(task =>
                task.id === action.payload.id
            )
            const copyTask = [...state.tasks];
            copyTask[index] = action.payload;
            state.tasks = copyTask
        },
    },
    extraReducers:{
        [FetchTodos.pending]: (state,action) => {
            state.status = 'loading';
            state.error = null;
        },
        [FetchTodos.fulfilled]: (state,action) => {
            state.status = 'resolved';
            state.tasks = action.payload;
        },
        [FetchTodos.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
})

export const {addtask, removetask, edittask} = TasksSlice.actions

export default TasksSlice.reducer