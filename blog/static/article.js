const hidden = document.getElementById("hidden");
const sub = document.getElementById("sub");
const overwrap = document.getElementById("overwrap");
sub.innerHTML=marked(hidden.value)
var h1_list=sub.getElementsByTagName("h1")
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
  img.src= "{% static '"+check_url+"' %}"
  img.src="/media/"+check_url
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
function func2(){
  overwrap.style.display = "block";
  document.getElementById('input').focus();
}
function func3(){
  overwrap.style.display = "none";
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