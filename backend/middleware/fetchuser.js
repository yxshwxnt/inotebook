var jwt=require('jsonwebtoken');  
const JWT_SECRET='harryisaGoodboy';

const fetchuser=(req,res,next)=>{
    //GET the user from jwt token and append id to req objext 
    const token=req.header('auth-token'); 
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"});    
    }
    try {
        const data=jwt.verify(token,JWT_SECRET); 
        req.user=data.user; 
        next()   
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"});    
    }
}

module.exports=fetchuser; 
