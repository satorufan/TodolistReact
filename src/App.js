import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';


import Main from './pages/Main';
import List from './pages/List';
import Edit from './pages/Edit';


// 리액트 서버에서 jsp 톰캣 서버로 접속하려면 cors문제가 발생한다.
// 서버에서 Cors 문제를 해결해주어야 한다.
// cors는 포트가 다를 경우 서로 다른 서버로 간주해서 리소스 요청 및 응답이 되지 않는 것을 말함.
// 크로스 오리진 문제 발생을 해결해야 한다. (검색)
function App() {
	const navi = useNavigate();
  	return (
    	<>
	    	<h1 align="center" style={{cursor : "pointer"}} onClick={()=>{navi("/")}}> Todo List </h1>
	    	<Routes>
				<Route path="/" element={<Main />}/>
				<Route path="/list" element={<List />}/>
				<Route path="/list/edit" element={<Edit />}/>
	    	</Routes>
	    </>
	  );
}

export default App;
