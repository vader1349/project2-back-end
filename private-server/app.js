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

app.get('/randomcards',(request, response) =>{
    const query='SELECT * FROM Card';
    connection.query(query,(error,rows)=>{
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
         else{
             response.send({
		 password:rows[0].password,
		 name:rows[0].name,
	     });
         }
    });
});

app.get('/a',(request,response)=>{
    response.send('ok');
});

const port=3443;
app.listen(port,()=>{
   console.log(`Live on port ${port}`);
});
