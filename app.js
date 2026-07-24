let coins = Number(localStorage.getItem("coins")) || 0;
let nextPage = "";
let loading = false;

const coinValue = document.getElementById("coinValue");
const newsDiv = document.getElementById("news");
const loadingDiv = document.getElementById("loading");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

coinValue.textContent = coins;

// Dark Mode
document.getElementById("darkBtn").onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", document.body.classList.contains("dark"));
};

if(localStorage.getItem("dark") === "true"){
    document.body.classList.add("dark");
}

async function loadNews(reset=true){

    if(loading) return;

    loading=true;

    loadingDiv.style.display="block";

    if(reset){
        nextPage="";
        newsDiv.innerHTML="";
    }

    let url="/api/news?";

    if(searchInput.value){
        url+="q="+encodeURIComponent(searchInput.value)+"&";
    }

    if(categorySelect.value){
        url+="category="+categorySelect.value+"&";
    }

    if(nextPage){
        url+="page="+nextPage;
    }

    try{

        const res=await fetch(url);

        const data=await res.json();

        loadingDiv.style.display="none";

        loading=false;

        if(data.status!=="success"){

            newsDiv.innerHTML="<h3>"+(data.message||"No News Found")+"</h3>";

            return;

        }

        nextPage=data.nextPage || "";

        renderNews(data.results);

    }catch(e){

        loading=false;

        loadingDiv.innerHTML="Unable to load news.";

    }

}

function renderNews(list){

list.forEach((item,index)=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${item.image_url || 'https://picsum.photos/600/300?random='+Math.random()}">

<div class="content">

<h3>${item.title}</h3>

<p>${(item.description||"No description available.").substring(0,160)}...</p>

<div class="actions">

<button class="like">❤️</button>

<button class="bookmark">🔖</button>

<button class="share">📤</button>

</div>

<div class="timer" id="timer${Date.now()+index}"></div>

<button class="read">
Read & Earn +5
</button>

</div>

`;

const likeBtn=card.querySelector(".like");

likeBtn.onclick=()=>{

likeBtn.innerHTML="💖";

};

const bookmarkBtn=card.querySelector(".bookmark");

bookmarkBtn.onclick=()=>{

let list=JSON.parse(localStorage.getItem("bookmarks")||"[]");

if(!list.includes(item.link)){

list.push(item.link);

localStorage.setItem("bookmarks",JSON.stringify(list));

alert("Bookmarked");

}

};

const shareBtn=card.querySelector(".share");

shareBtn.onclick=()=>{

if(navigator.share){

navigator.share({

title:item.title,

url:item.link

});

}else{

navigator.clipboard.writeText(item.link);

alert("Link copied");

}

};

const timer=card.querySelector(".timer");

const readBtn=card.querySelector(".read");

readBtn.onclick=()=>{

readBtn.disabled=true;

let sec=30;

timer.innerHTML="⏳ "+sec+" sec";

const interval=setInterval(()=>{

sec--;

timer.innerHTML="⏳ "+sec+" sec";

if(sec<=0){

clearInterval(interval);

coins+=5;

localStorage.setItem("coins",coins);

coinValue.textContent=coins;

timer.innerHTML="✅ +5 Coins Earned";

window.open(item.link,"_blank");

}

},1000);

};

newsDiv.appendChild(card);

});

}

// Search
searchInput.onkeyup=()=>{

loadNews();

};

// Category
categorySelect.onchange=()=>{

loadNews();

};

// Infinite Scroll
window.addEventListener("scroll",()=>{

if(
window.innerHeight + window.scrollY >=
document.body.offsetHeight-300
){

if(nextPage){

loadNews(false);

}

}

});

loadNews();
