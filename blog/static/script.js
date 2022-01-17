ace.$blockScrolling = Infinity;
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.setFontSize(14);
editor.getSession().setMode("ace/mode/html");
editor.getSession().setUseWrapMode(true);
editor.getSession().setTabSize(2);
editor.getSession().setMode("ace/mode/markdown");
console.log(marked)
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