import {Table} from 'react-bootstrap';
import {useSelector,useDispatch} from "react-redux";
import { changeName,changeAge } from "./../store/userSlice";
import {changeCount} from "./../store";
function Cart(){

   let state =  useSelector((state)=>{return state})
   let dispatch = useDispatch()

   console.log(state.data)
    return(
        <div>
            {state.user.name} {state.user.age}의 장바구니
            <button onClick={()=>{dispatch(changeAge(100))}}>버튼</button>
            <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.data.map(function(ele,idx){
                        return (
                            <><tr><td>{ele.id}</td><td>{ele.name}</td><td>{ele.count}</td><td>
                                <button onClick={()=>{dispatch(changeCount(ele.id))}}>+</button></td></tr></>
                        )
                      })
                }
                
            </tbody>
            </Table>           
        </div>
    )
}

export default Cart