export default async function handler(req, res) {

const API_KEY = process.env.NEWSDATA_API_KEY;

const {
page = "",
q = "",
category = ""
} = req.query;

let url =
`https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en`;

if(q){
url += `&q=${encodeURIComponent(q)}`;
}else{
url += `&country=in`;
}

if(category){
url += `&category=${category}`;
}

if(page){
url += `&page=${page}`;
}

try{

const response = await fetch(url);

const data = await response.json();

res.setHeader("Cache-Control","s-maxage=300");

res.status(200).json(data);

}catch(error){

res.status(500).json({
status:"error",
message:error.message
});

}

}