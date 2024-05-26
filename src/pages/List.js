//List.js
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

import App from "../App";

function getList (setElem, setShow) {
	axios.get("http://localhost:3001/getlist")
	.then((res)=>{
		setElem(res.data);
		setShow(res.data);
	}).catch((err)=>{
		console.log(err);
	});
}
	
function postList (url, id, done, enabled, setElem, setShow) {
	axios({
		method: 'post',
		url : url,
		data: {
			id : id,
			do : done,
			enabled : enabled
		}
	}).then((res)=>{
		getList(setElem, setShow);
		!res.data || alert(res.data);
	});
}

function List() {
	const [elem_list, setElem] = useState([]);
	const [show, setShow] = useState([]);
	
	useEffect(()=>{
		console.log("렌더링");
		getList(setElem, setShow);
	}, [])
	
	const done = (id, enabled) => {
		postList("http://localhost:3001/getlist/done",
		id, null, !enabled, setElem, setShow);
	};
	
	const elemInput = useRef();
	const Add = () => {
		postList("http://localhost:3001/getlist/insert",
		null, elemInput.current.value, false, setElem, setShow);
		elemInput.current.value ="";
	}
	
	const [disabled, setdis] = useState(true);
	const elemEdit = useRef([]);
	const onChange = (e) => {
		const { value, name } = e.target;
		const tempElem = [...elem_list];
		tempElem[name].do = value;
	    setElem(tempElem);
	};
	const Edit = (idx, id) => {
		if (!disabled) {
			alert("수정완료");
		} else {
			postList("http://localhost:3001/getlist/edit",
			id, elemEdit.current[idx].value, null, setElem, setShow);
		}
		setdis(!disabled);
	}
	
	const Delete = (id) => {
		postList("http://localhost:3001/getlist/delete",
		id, null, null, setElem, setShow);
	}
	
	const Search = (e) => {
		const searchDo = [];
		for (let i=0 ; i<elem_list.length ; i++){
			if (elem_list[i].do.indexOf(e.target.value) != -1) {
				searchDo.push(elem_list[i]);
			}
		}
		setShow(searchDo);
	};
	
	function showList (elem_list) {
		return(
			<>
				{
					elem_list.map((elem, idx)=>(
						<tr key={idx}>
							<td align="center">{idx+1}</td>
							<td>
								<input ref={el=>elemEdit.current[idx]=el} name={""+idx} onChange={onChange} value={elem.do} hidden={disabled}/>
								<a style={elem.enabled ? {textDecoration : "line-through"} : {textDecoration : ""}} hidden={!disabled}>{elem.do}</a>
							</td>
							<td align="center"><button onClick={()=>done(elem.id, elem.enabled)}>{elem.enabled ? "Complete":"No-Compelete" }</button></td>
							<td align="center">
								<button onClick={()=>Edit(idx, elem.id)} hidden={!disabled}>Edit</button>
								<button onClick={()=>Edit(idx, elem.id)} hidden={disabled}>Confirm</button>
							</td>
							<td align="center"><button onClick={()=>Delete(elem.id)}>Delete</button></td>
						</tr>
					))
				}
			</>
		);
	}
	
	return(
		<div align="center">
			<h2> My List </h2>
			<table width="800px" border="5px">
				<tbody>
					<tr>
						<th colSpan="5" align="right">SEARCH :&nbsp;
						<input onKeyUp={Search} placeholder="Search your schedule"/></th>
					</tr>
				</tbody>
				<tbody>
					<tr>
						<th>NO</th>
						<th width="400">LIST</th>
						<th width="150">Complete</th>
						<th>UPADATE</th>
						<th>REMOVE</th>
					</tr>
				</tbody>
				<tbody>
					{showList(show)}
				</tbody>
				<tbody>
					<tr>
						<td align="center">{elem_list.length+1}</td>
						<td><input placeholder="Add your schedule" ref={elemInput} /></td>
						<th align="center" colSpan="3" 
						style={{cursor : "pointer"}} onClick={()=>Add()}>ADD</th>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default List;