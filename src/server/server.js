//server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const PORT = 3001;

//MySQL 연결
const db = mysql.createPool({
	host : "localhost",
	user : "todolist",
	password : "todolist",
	database : "todolist"
});

app.use(express.json());

app.use(cors({
	origin : "*",
	credentials : true,		//응답 헤더에 access-control-allow-credentials 추가
	optionsSuccessStatus : 200,
}));
app.use(express.urlencoded({extended : true}));
app.listen(PORT,()=>{
	console.log(`server running on port ${PORT}`)
});
//http://localhost:3001/
app.get("/", (req, res)=>{
	res.send("데이터베이스 접속 성공");
});
//http://localhost:3001/getlist
app.get("/getlist", (req, res)=>{
	res.header("Access-Control-Allow-Origin", "*");
	const sql = "select * from todo";
	db.query(sql, (error, rows, fields)=>{
		if(error) {
			res.send(error + "실패");
		} else {
			res.send(rows);
		}
	});
});

app.post("/getlist/insert", (req, res)=>{
	const sql = `insert into todo values(NULL, "${req.body.do}", ${req.body.enabled})`;
	db.query(sql, (error, rows, fields)=>{
		if(error) {
			console.log(error);
			res.send(error);
		} else {
			console.log("성공");
			res.send("업로드하였습니다.");
		}
	});
});

app.post("/getlist/edit", (req, res)=>{
	const sql = `update todo set do="${req.body.do}" where id=${req.body.id}`;
	db.query(sql, (error, rows, fields)=>{
		if(error) {
			console.log(error);
			res.send(error);
		} else {
			console.log("성공");
			res.send("수정하였습니다.");
		}
	});
});

app.post("/getlist/done", (req, res)=>{
	const sql = `update todo set enabled=${req.body.enabled} where id=${req.body.id}`;
	db.query(sql, (error, rows, fields)=>{
		if(error) {
			console.log(error);
		} else {
			console.log("성공");
		}
	});
});

app.post("/getlist/delete", (req, res)=>{
	const sql = `delete from todo where id=${req.body.id}`;
	db.query(sql, (error, rows, fields)=>{
		if(error) {
			console.log(error);
			res.send(error);
		} else {
			console.log("성공");
			res.send("삭제하였습니다.");
		}
	});
});

