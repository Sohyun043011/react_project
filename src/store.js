import { configureStore,createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'





let stock = createSlice(
    {
        name : 'stock',
        initialState : [10,11,12]
    }
)
let data = createSlice(
    
    {
        name : 'data',
        initialState : 
        [
            {id : 0, name : 'White and Black', count : 2},
            {id : 2, name : 'Grey Yordan', count : 1}
        ],
        reducers:{
            changeCount(state,action){
                //action : 상품 id{0,2}
                state.find((state)=>{
                    return state.id==action.payload
                }).count+=1;
            },
            addItem(state,action){
                state.push(action.payload);
            }
        }

    }
    
)
export let { changeCount,addItem } = data.actions

export default configureStore({
  reducer: { 
      user : user.reducer,
      stock : stock.reducer,
      data : data.reducer

  }
}) 