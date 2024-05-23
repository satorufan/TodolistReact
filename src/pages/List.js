//List.js
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

function List() {
	const navi = useNavigate();
	const [elem_list, setElem] = useState([
						{do : "Clean", com : false}, 
						{do : "Wash", com : false}, 
						{do : "Playing Game", com : false}, 
						{do : "Homework", com : false}, 
						{do : "Cooking", com : false}]);
	const elemInput = useRef();
	const elemDo = useRef([]);
	const [disabled, setdis] = useState(true);
	const onChange = (e) => {
		const { value, name } = e.target;
		const tempElem = [...elem_list];
		tempElem[name].do = value;
	    setElem(tempElem);
	};
	
	const done = (idx) => {
		const tempElem = [...elem_list];
		tempElem[idx].com = !elem_list[idx].com;
		setElem(tempElem);
	}
	
	const Add = () => {
		alert("Success");
		setElem(
			[...elem_list, {do : elemInput.current.value, com : false}]
		);
		elemInput.current.value ="";
	}
	
	const Edit = (idx) => {
		setdis(!disabled);
	}
	
	const Delete = (idx) => {
		alert("Success");
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
								<input name={idx} onChange={onChange} value={elem.do} hidden={disabled}/>
								<a style={elem.com ? {textDecoration : "line-through"} : {cursor : ""}} hidden={!disabled}>{elem.do}</a>
							</td>
							<td align="center"><button onClick={()=>done(idx)}>{elem.com ? "Complete":"No-Compelete" }</button></td>
							<td align="center"><button onClick={()=>Edit(idx)}>Edit</button></td>
							<td align="center"><button onClick={()=>Delete(idx)}>Delete</button></td>
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