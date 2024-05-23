//Main.js
import { useNavigate } from "react-router-dom";

function Main() {
	const navi = useNavigate();
	return (
		<div align="center">
			<h2 align="center" style={{cursor : "pointer"}} 
			onClick={()=>{navi("/list")}}> START! </h2>
		</div>
	);
}

export default Main;