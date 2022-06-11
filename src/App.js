import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react";
import {Navbar,Container,Nav,Row,Col} from 'react-bootstrap';
import bg from './img/bg.png'
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart';

function App() {


  let [shoes,setShoes] = useState(data)
  let [count,setCount] = useState(0);   //버튼 누른 횟수 저장할 state
  let [show,setShow]=useState(false);
  let navigate = useNavigate();


  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/detail')}}>상세페이지</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      {show==true ? <Loading></Loading> : null}
      
      <button onClick={()=>{
        // 로딩중 ui 띄우기
        setShow(true);
        setCount(count+1);
        if(count==0){
            axios.get('https://codingapple1.github.io/shop/data2.json').then((result)=>{
            let copy= [...shoes,...result.data];
            setShoes(copy)
            // 로딩중 ui 지우기
            setShow(false);
          })
          .catch(()=>{
            // 로딩중 ui 지우기
            setShow(false);
            console.log(' fail ');
          })
        }
        else if(count==1){
            axios.get('https://codingapple1.github.io/shop/data3.json').then((result)=>{
            let copy= [...shoes,...result.data];
            setShoes(copy)
            // 로딩중 ui 지우기
            setShow(false);
          })
          .catch(()=>{
            // 로딩중 ui 지우기
            console.log(' fail ');
            setShow(false);
          })
        }
        else{
          alert('상품이 더 없습니다.');
          
          setShow(false);
        }
        
      }}>버튼을 눌러라
      </button>
      <Routes>
         <Route path="/" element={
           <div>
              <div className="main-bg" style={{backgroundImage:'url('+bg+')'}}></div>
                <Container>
                  <Row>
                    {
                      shoes.map(function(ele,idx){
                        return (
                          <Card shoes={shoes[idx]} i={idx+1}></Card>
                        )
                      })
                    }           
                  </Row>
                </Container>
           </div>
         
        } />
         <Route path="/detail/:id" element={<Detail shoes={shoes}/> } />
         <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버들</div> } />
          <Route path="location" element={<div>회사위치</div> } />
         </Route>
         <Route path="/event" element={<Event />} >
           <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
           <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
         </Route>
         <Route path="/cart" element = {<Cart />}/>
         <Route path="*" element={<div>없는 페이지에요</div>}/>
      </Routes>
      
      
    </div>
  );
}

function Card(props){
  return(
    <Col>
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%"></img>
      <h5>{props.shoes.title}</h5>
      <p>{props.shoes.price}</p>
    </Col>
  )
}

function About(){
  return(
    <div>
      <h4>about페이지임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event(){
  return(
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </>
  )
}

function Loading(){
  // 로딩 중  ui
  return(
    <div className ="loading-div">
     <p> 로딩중입니다 </p> 
    </div>
  )
}
export default App;
