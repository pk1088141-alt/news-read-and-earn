const API_KEY = "const API_KEY = "pub_fd694b54471a4ac0bb7b3f23ccbe1297";

let coins = Number(localStorage.getItem("coins")) || 0;
document.getElementById("coins").innerHTML = "🪙 " + coins + " Coins";

// Dark Mode
document.getElementById("darkBtn").onclick = () => {
    document.body.classList.toggle("dark");
};

async function loadNews(query = "") {

const url = query
? `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=${encodeURIComponent(query)}&language=en`
: `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=in&language=en`;

document.getElementById("loader").style.display="block";

try{

const res = await fetch(url);
const data = await res.json();

document.getElementById("loader").style.display="none";

showNews(data.results || []);

}catch(e){

document.getElementById("loader").innerHTML="Failed to load news.";

}

}

function showNews(news){

let html="";

news.forEach((item,index)=>{

html+=`

<div class="card">

<img src="${item.image_url || 'https://picsum.photos/600/300?random='+index}">

<div class="content">

<h3>${item.title}</h3>

<p>${(item.description||"No Description").substring(0,150)}...</p>

<div class="actions">

<button class="like" onclick="likeNews(this)">❤️</button>

<button class="bookmark" onclick="bookmark('${item.link}')">🔖</button>

<button class="share" onclick="shareNews('${item.link}')">📤</button>

</div>

<div class="timer" id="timer${index}"></div>

<button class="read" onclick="startReading('${item.link}',${index},this)">
Read & Earn +5
</button>

</div>

</div>

`;

});

document.getElementById("news").innerHTML=html;

}

function likeNews(btn){

btn.innerHTML="❤️ Liked";

}

function bookmark(url){

let list=JSON.parse(localStorage.getItem("bookmarks")||"[]");

if(!list.includes(url)){

list.push(url);

localStorage.setItem("bookmarks",JSON.stringify(list));

alert("Bookmarked!");

}

}

function shareNews(url){

if(navigator.share){

navigator.share({url});

}else{

navigator.clipboard.writeText(url);

alert("Link copied!");

}

}

function startReading(url,id,btn){

btn.disabled=true;

let sec=30;

const timer=document.getElementById("timer"+id);

timer.innerHTML="⏳ "+sec+" sec";

const interval=setInterval(()=>{

sec--;

timer.innerHTML="⏳ "+sec+" sec";

if(sec<=0){

clearInterval(interval);

coins+=5;

localStorage.setItem("coins",coins);

document.getElementById("coins").innerHTML="🪙 "+coins+" Coins";

timer.innerHTML="✅ +5 Coins Earned";

window.open(url,"_blank");

}

},1000);

}

// Search
document.getElementById("search").addEventListener("keyup",(e)=>{

loadNews(e.target.value);

});

loadNews();
