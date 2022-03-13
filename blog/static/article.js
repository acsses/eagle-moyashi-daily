const hidden = document.getElementById("hidden");
const sub = document.getElementById("sub");
const overwrap = document.getElementById("overwrap");
sub.innerHTML=marked(hidden.value)
var h1_list=sub.getElementsByTagName("h1")
var connection = new WebSocket("wss://" + window.location.host + "/ws/test");
connection.onmessage = function(e) {
  alert(e.data);
}
for(var h1 of h1_list){
  h1.classList.add("font")
  h1.classList.add("font_h1")
}
var h2_list=sub.getElementsByTagName("h2")
for(var h2 of h2_list){
  h2.classList.add("font")
  h2.classList.add("font_h2")
}
var h3_list=sub.getElementsByTagName("h3")
for(var h3 of h3_list){
  h3.classList.add("font")
  h3.classList.add("font_h3")
}
var p_list=sub.getElementsByTagName("p")
for(var p of p_list){
  p.classList.add("font")
  p.classList.add("font_p")
}
var quote_list=sub.getElementsByTagName("blockquote")
for(var quote of quote_list){
  quote.classList.add("font")
  quote.classList.add("quote")
}
var li_list=sub.getElementsByTagName("li")
for(var li of li_list){
  li.classList.add("font")
  li.classList.add("font_li")
}
var ol_list=sub.getElementsByTagName("ol")
for(var ol of ol_list){
  ol.classList.add("font")
  ol.classList.add("font_ol")
}
var ul_list=sub.getElementsByTagName("ul")
for(var ul of ul_list){
  ul.classList.add("font")
  ul.classList.add("font_ol")
}
var table_list=sub.getElementsByTagName("table")
for(var table of table_list){
  table.classList.add("font")
  table.classList.add("table")
}
var td_list=sub.getElementsByTagName("td")
for(var td of td_list){
  td.classList.add("t")
}
var th_list=sub.getElementsByTagName("th")
for(var th of th_list){
  th.classList.add("t")
}
var img_list=sub.getElementsByTagName("img")
for(var img of img_list){
  console.log(img.src)
  check_url=img.src.split("/")[img.src.split("/").length-1]
  img.src= "https://eagle-moyashi-daily.s3.ap-northeast-1.amazonaws.com/"+check_url
  img.classList.add("img")
}
var code_list=sub.getElementsByTagName("code")
for(var code of code_list){
  code.parentNode.classList.add("font_code")
  code.classList.add("font_code")
}
sub.querySelectorAll('pre code[class^="language-"]').forEach(block => {
  block.parentNode.classList.remove("font_code")
  block.classList.remove("font_code")
  hljs.highlightBlock(block)
  block.parentNode.classList.add("font_code")
  block.classList.add("font_code")
})
var a_list=sub.getElementsByTagName("a")
func_list=[]
for(var a of a_list){
  func_list.push(new Promise((resolve,reject) => {
    connection.onmessage = function(e) {
      console.log(JSON.parse(e.data))
      var card=document.createElement("div")
      card.classList.add("card")
      var data=document.createElement("div")
      data.classList.add("data_link")
      var title=document.createElement("h2")
      title.classList.add("card_title")
      title.classList.add("text")
      title.textContent=JSON.parse(e.data).send.title
      data.appendChild(title)
      var summary=document.createElement("p")
      summary.classList.add("card_summary")
      summary.classList.add("text")
      summary.textContent=JSON.parse(e.data).send.descriptin
      data.appendChild(summary)
      var url=document.createElement("p")
      url.classList.add("card_url")
      url.classList.add("text")
      url.textContent=JSON.parse(e.data).send.url
      data.appendChild(url)
      card.appendChild(data)
      var img_div=document.createElement("div")
      img_div.classList.add("card_img_div")
      var img=document.createElement("img")
      img.src=JSON.parse(e.data).send.image
      img.classList.add("card_img_in")
      img_div.appendChild(img)
      card.appendChild(img_div)
      a.innerHTML=""
      a.appendChild(card)
      a.classList.add("card_link")
      resolve()
    }
    connection.send(JSON.stringify({"data":a.href}))
  }))
}
Promise.all(func_list)
var margin=document.createElement("div")
margin.style.height="20px"
sub.appendChild(margin)
MathJax.Hub.Configured();
MathJax.Hub.Queue(["Typeset", MathJax.Hub, sub])

function func1() {
  S=sub.contentWindow.document.body.scrollHeight*sub.contentWindow.document.body.scrollWidth;
  delta=S/(screen.width*0.7)-sub.contentWindow.document.body.scrollHeigh
  console.log(delta)
  if(delta<0){
    delta=0
  }
  sub.style.height = sub.contentWindow.document.body.scrollHeight+delta+50+ "px";
}
function func2() {
  overwrap.classList.remove("overwrap_off_animation")
  console.log(overwrap.style.height)
  overwrap.style.display = "block";
  overwrap.onanimationend = () => {
    overwrap.style.height="100vh"
  };
  overwrap.classList.add("overwrap_animation")
}
function func3(){
  overwrap.onanimationend = () => {
    overwrap.style.display="none"
  };
  overwrap.classList.add("overwrap_off_animation")
}
function func4(){
  textbox = document.getElementById("input")
  text=textbox.value
  window.location.href = 'https://eagle-moyashi-daily.herokuapp.com/?serch='+text;
}
function func5(){
  console.log("who")
  text = document.getElementsByClassName("chiled").textContent;
  if(text=="None"){
    console.log("hi")
    document.getElementById("wide_in_before").classList.remove("hover_can");
    document.getElementById("link").setAttribute('href', "");
  }
}
function func6(){
  text = document.getElementsByClassName("chiled").textContent;
  if(text=="None"){
    document.getElementById("wide_in_after").classList.remove("hover_can");
    document.getElementById("link").setAttribute('href', "");
  }
}