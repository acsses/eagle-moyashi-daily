ace.$blockScrolling = Infinity;
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setFontSize(14);
editor.getSession().setMode("ace/mode/html");
editor.getSession().setUseWrapMode(true);
editor.getSession().setTabSize(2);
editor.getSession().setMode("ace/mode/markdown");
var files=document.getElementById("images")
var file_colum=document.getElementById("file_colum")
var header_img=document.getElementById('header_img')
var header_file=document.getElementById('header_file')
var title=document.getElementById('input')
var ele=document.getElementById("show")
var id=document.getElementById('id')
var file_datas=new FormData();
var connection = new WebSocket("ws://" + window.location.host + "/ws/test");
connection.onmessage = function(e) {
  alert(e.data);
}
header_file.addEventListener('change',()=>{
  f(header_file.files[0],header_img)
})
files.addEventListener('change',()=>{
  for (let i = 0; i < files.files.length; i++) {
    file_datas.append("file",files.files[i])
  }
  file_colum.innerHTML=""
  for (let i = 0; i < file_datas.getAll("file").length; i++) {
    file_list=document.createElement('h3')
    file_list.textContent=file_datas.getAll("file")[i].name
    file_list.classList.add("filelist")
    file_colum.appendChild(file_list)
  }
})
function f(file,parent){
  reader = new FileReader();
  var img = document.createElement("img");
  reader.onload = function (e) {
    var imageUrl = e.target.result; // URLはevent.target.resultで呼び出せる
    var img = document.createElement("img"); // img要素を作成
    img.classList.add("img")
    img.src = imageUrl; // URLをimg要素にセット
    img.alt=file.name
    parent.innerHTML=""
    parent.appendChild(img); // #previewの中に追加
  }
  reader.readAsDataURL(file);
}
editor.on('change',()=>{
  var ele=document.getElementById("show")
  ele.innerHTML =""
  var i=false
  ele.innerHTML = marked(editor.getValue())
  var h1_list=ele.getElementsByTagName("h1")
  for(var h1 of h1_list){
    h1.classList.add("font")
    h1.classList.add("font_h1")
  }
  var h2_list=ele.getElementsByTagName("h2")
  for(var h2 of h2_list){
    h2.classList.add("font")
    h2.classList.add("font_h2")
  }
  var h3_list=ele.getElementsByTagName("h3")
  for(var h3 of h3_list){
    h3.classList.add("font")
    h3.classList.add("font_h3")
  }
  var p_list=ele.getElementsByTagName("p")
  for(var p of p_list){
    p.classList.add("font")
    p.classList.add("font_p")
  }
  var quote_list=ele.getElementsByTagName("blockquote")
  for(var quote of quote_list){
    quote.classList.add("font")
    quote.classList.add("quote")
  }
  var li_list=ele.getElementsByTagName("li")
  for(var li of li_list){
    li.classList.add("font")
    li.classList.add("font_li")
  }
  var ol_list=ele.getElementsByTagName("ol")
  for(var ol of ol_list){
    ol.classList.add("font")
    ol.classList.add("font_ol")
  }
  var ul_list=ele.getElementsByTagName("ul")
  for(var ul of ul_list){
    ul.classList.add("font")
    ul.classList.add("font_ol")
  }
  var table_list=ele.getElementsByTagName("table")
  for(var table of table_list){
    table.classList.add("font")
    table.classList.add("table")
  }
  var td_list=ele.getElementsByTagName("td")
  for(var td of td_list){
    td.classList.add("t")
  }
  var th_list=ele.getElementsByTagName("th")
  for(var th of th_list){
    th.classList.add("t")
  }
  var img_list=ele.getElementsByTagName("img")
  for(var img of img_list){
    check_url=img.src.split("/")[img.src.split("/").length-1]
    for (let i = 0; i < file_datas.getAll("file").length; i++) {
      if(check_url.trim()==file_datas.getAll("file")[i].name.trim()){
        f(file_datas.getAll("file")[i],img.parentNode)
      }
    }
    img.classList.add("img")
  }
  var code_list=ele.getElementsByTagName("code")
  for(var code of code_list){
    code.parentNode.classList.add("font_code")
    code.classList.add("font_code")
  }
  ele.querySelectorAll('pre code[class^="language-"]').forEach(block => {
    block.parentNode.classList.remove("font_code")
    block.classList.remove("font_code")
    hljs.highlightBlock(block)
    block.parentNode.classList.add("font_code")
    block.classList.add("font_code")
  })
  var a_list=ele.getElementsByTagName("a")
  for(var a of a_list){
    link_card=document.createElement("div")
    connection.onmessage = function(e) {
      
      console.log(JSON.parse(e.data))
    }
    connection.send(JSON.stringify({"data":a.href}))
  }
  MathJax.Hub.Configured();
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, ele]);
})

function func_submit(){
  var fd = new FormData();
  fd.append("header_file",header_file.files[0])
  for (let i = 0; i < file_datas.getAll("file").length; i++) {
    fd.append("images",file_datas.getAll("file")[i])
  }
  fd.append("title",title.value)
  var imgs=ele.getElementsByTagName("img")
  for(var image of imgs){
    console.log(image.getAttribute('alt'))
    if(!(image.getAttribute('alt')=="image")){
      image.src="/media/"+image.getAttribute('alt')
    }
  }
  fd.append("inside",editor.getValue())
  fd.append("id",id.value)
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://eagle-moyashi-daily.herokuapp.com/new_page/");
  xhr.send(fd);
}