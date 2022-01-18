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
files.addEventListener('change',()=>{
  file_colum.innerHTML=""
  for (let i = 0; i < files.files.length; i++) {
    file_list=document.createElement('h3')
    file_list.textContent=files.files[i].name
    file_list.classList.add("filelist")
    file_colum.appendChild(file_list)
  }
})
console.log(files)
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
  console.log(ele.innerHTML)
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
    for (let i = 0; i < files.files.length; i++) {
      console.log(files.files[i].name)
      console.log(img.src)
      if(check_url==files.files[i].name){
        f(files.files[i],img.parentNode)
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
  })
  MathJax.Hub.Configured();
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, ele]);
})