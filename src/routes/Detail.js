import {useParams} from "react-router-dom";
import {useState,useEffect} from "react";
import {Navbar,Container,Nav,Row,Col} from 'react-bootstrap';
import {useSelector,useDispatch} from "react-redux";
import styled from 'styled-components';
import {addItem} from './Cart';

function Detail(props){

  let state =  useSelector((state)=>{return state})
  let dispatch = useDispatch()

  let [display,setDisplay]=useState(true);
  let [num,setNum] = useState('')
  let [tab,setTab] = useState(0);
  let [fade,setFade] = useState('');
  // mount, update 될 시 실행
  //[] : useEffect 실행조건 넣을 수 있는 곳. 비워두면, mount 시 1회만 실행되게 함.
  useEffect(()=>{
      //  2초 후  div 박스 사라지게
      let a = setTimeout(()=>{setDisplay(false)},2000)
      return ()=>{
        // useEffect 동작 전에 실행되는 return()=>{} <Clean up function>
        // ex. 기존 timer 제거하고 실행하자~
        clearTimeout(a);
      }
  },[]);
  useEffect(()=>{
    if(isNaN(num)==true){
      alert('Dont do that');

    }
  },[num]);
  useEffect(()=>{
    let a = setTimeout(()=>{setFade('end')},100)
    return()=>{
      clearTimeout(a);
      setFade('');
    }
  },[])

  let {id} = useParams(); //유저가 :id 자리에 적은거 가져와줌
  // console.log(id);
  let item = props.shoes.find(function(x){
    return x.id == id;
  })
    return(
      <div className={'container start ' + fade}>
        {
          display==true
          ? <div className="yellow-box">2초 이내 구매시 할인!</div> 
          : null
        }
        <input onChange={(e)=>{setNum(e.target.value)}}/>
        <div className="row">
          <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{item.title}</h4>
            <p>{item.content}</p>
            <p>{item.price}</p>
            <button className="btn btn-danger">주문하기</button> 
          </div>
          <Nav variant="tabs"  defaultActiveKey="link0">
              <Nav.Item>
                <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">상세정보</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">문의사항</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={()=>{setTab(2)}}  eventKey="link2">Q&A</Nav.Link>
              </Nav.Item>
          </Nav>
          <Tabdiv tab={tab} />
        </div>
      </div> 
    )  
}

function Tabdiv(props){

    // if(props.tab==0){
    //   return <div>내용0</div>
    // }
    // else if(props.tab==1){
    //   return <div>내용1</div>
    // }
    // else if(props.tab==2){
    //   return <div>내용2</div>
    // }
    let [fade,setFade] = useState('');
    useEffect(()=>{
      let a = setTimeout(()=>{setFade('end')},100);
      return()=>{
        clearTimeout(a);
        setFade('');
      }
    },[props.tab])

    return (
      <div className={'start ' + fade}>
        { [<div>상세정보입니다</div>, <div>문의사항입니다</div>, <div>Q&A 입니다</div>][props.tab] }
      </div>
    )
    
    
}

export default Detail;
