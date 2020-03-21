const express=require("express");
let app=express();
let server;
app.use(express.static(__dirname+"/public"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/home.html");
});
server=app.listen(process.env.PORT||3000,()=>{
    console.log("Server Running");
});
let io=require("socket.io")(server);
io.on("connection",(socket)=>{
    socket.on("newFrame",(frame)=>{
        socket.emit("pixels",frame);
    })
})
