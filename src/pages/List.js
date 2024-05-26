//List.js
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

import App from "../App";

function List() {
	const [elem_list, setElem] = useState([]);
	const [EditMode, setEdit] = useState(0);
	
	useEffect(()=>{
		if (EditMode == 0) {
			axios.get("http://localhost:3001/getlist")
			.then((res)=>{
				setElem(res.data);
			}).catch((err)=>{
				console.log(err);
			});
		}
	}, [elem_list]);
	
	const elemEdit = useRef([]);
	const onChange = (e) => {
		const { value, name } = e.target;
		const tempElem = [...elem_list];
		tempElem[name].do = value;
	    setElem(tempElem);
	};
	
	const [disabled, setdis] = useState(true);
	const done = (idx, elemId, complete) => {
		axios({
			method: 'post',
			url : "http://localhost:3001/getlist/done",
			data: {
				id : elemId,
				enabled : !complete
			}
		}).then((res)=>{
			alert(res.data);
		})
		//const tempElem = [...elem_list];
		//tempElem[idx].com = !elem_list[idx].com;
		//setElem(tempElem);
	};
	
	const elemInput = useRef();
	const Add = () => {
		axios({
			method: 'post',
			url : "http://localhost:3001/getlist/insert",
			data: {
				do : elemInput.current.value,
				enabled : false
			}
		}).then((res)=>{
			alert(res.data);
		})
		setElem(
			[...elem_list, {do : elemInput.current.value, enabled : false}]
		);
		elemInput.current.value ="";
	}
	
	const Edit = (idx, elem_id) => {
		setdis(!disabled);
		if (EditMode == 0){
			setEdit(1);
		} else {
			axios({
				method: 'post',
				url : "http://localhost:3001/getlist/edit",
				data: {
					id : elem_id,
					do : elemEdit.current[idx].value
				}
			}).then((res)=>{
				alert(res.data);
			}).catch((err)=>{
				console.log(err);
			})
			setEdit(0);
		}
	}
	
	const Delete = (idx) => {
		axios({
			method: 'post',
			url : "http://localhost:3001/getlist/delete",
			data: {
				id : idx
			}
		}).then((res)=>{
			alert(res.data);
		})
		const elem_list_later = [...elem_list];
		setElem(
			elem_list.splice(0, idx).concat( elem_list_later.splice(idx+1, elem_list_later.length) )
		);
	}
	
	return(
		<div align="center">
			<h2> My List </h2>
			<table width="800px" border="5px">
				<tr>
					<th>NO</th>
					<th width="400">LIST</th>
					<th>Complete</th>
					<th>UPADATE</th>
					<th>REMOVE</th>
				</tr>
				{
					elem_list.map((elem, idx)=>(
						<tr>
							<td align="center">{idx+1}</td>
							<td>
								<input ref={el=>elemEdit.current[idx]=el} name={""+idx} onChange={onChange} value={elem.do} hidden={disabled}/>
								<a style={elem.enabled ? {textDecoration : "line-through"} : {textDecoration : ""}} hidden={!disabled}>{elem.do}</a>
							</td>
							<td align="center"><button onClick={()=>done(idx, elem.id, elem.enabled)}>{elem.enabled ? "Complete":"No-Compelete" }</button></td>
							<td align="center"><button onClick={()=>Edit(idx, elem.id)}>Edit</button></td>
							<td align="center"><button onClick={()=>Delete(elem.id)}>Delete</button></td>
						</tr>
					))
				}
				<tr>
					<td align="center">{elem_list.length+1}</td>
					<td><input placeholder="Input your schedule" ref={elemInput} /></td>
					<td align="center" colspan="3" 
					style={{cursor : "pointer"}} onClick={()=>Add()}>추가</td></tr>
			</table>
		</div>
	);
}

export default List;