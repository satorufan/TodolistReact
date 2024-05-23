import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';


import Main from './pages/Main';
import List from './pages/List';
import Edit from './pages/Edit';

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
