const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const fs=require('fs');

const app=express();
app.use(cors());
app.use(express.json());

let credentials=JSON.parse(fs.readFileSync('credentials.json','utf8'));
let connection=mysql.createConnection(credentials);
connection.connect();

function mapCards(row){
    return{
        id:row.id,
        email:row.u_email,
        message:row.message,
        text_color:row.text_color,
        back_color:row.back_color,
        day:row.day,
	      month:row.month,
	      year:row.year,
    };
}

app.get('/cards/:email',(request, response) =>{
    const query='SELECT * FROM Card WHERE u_email=? ORDER BY year DESC,month DESC,day DESC';
    const params=[request.params.email];
    connection.query(query,params,(error,rows)=>{
        if(error){
            console.log(`SELECT ERROR: ${error.message}`);
        }
         else{
             response.send({
                 cards:rows.map(mapCards),
	           });
         }
    });
});

app.get('/user/:email',(request, response) =>{
    const query='SELECT password,name FROM User WHERE email=?';
    const params=[request.params.email];
    connection.query(query,params,(error,rows)=>{
        if(error){
            console.log(`SELECT ERROR: ${error.message}`);
        }
         else if(rows.length>0){
             response.send({
                 isFound:true,
		             password:rows[0].password,
		             name:rows[0].name,
                 email:request.params.email,
	           });
         }
         else{
             response.send({
                 isFound:false,
	           });
         }
    });
});

app.post('/cards',(request,response)=>{
    const query='INSERT INTO Card(u_email,message,text_color,back_color,day,month,year) VALUES (?,?,?,?,?,?,?)';
    const params=[request.body.email,request.body.message,request.body.textColor,request.body.backColor,request.body.day,request.body.month,request.body.year];
    connection.query(query,params,(error,result)=>{
        if(error){
            console.log(`INSERT ERROR: ${error.message}`);
        }
        else{
             response.send({id:result.insertId,});
         }
    });
});

app.post('/user',(request,response)=>{
    const query='INSERT INTO User(email,name,password,signin_day,signin_month,signin_year) VALUES (?,?,?,?,?,?)';
    const params=[request.body.email,request.body.name,request.body.password,request.body.day,request.body.month,request.body.year];
    connection.query(query,params,(error,result)=>{
        if(error){
            console.log(`INSERT ERROR: ${error.message}`);
        }
        else{
             response.send({id:result.insertId,});
         }
    });
});

const port=3443;
app.listen(port,()=>{
   console.log(`Live on port ${port}`);
});
