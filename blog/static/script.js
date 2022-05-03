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
var connection = new WebSocket("wss://" + window.location.host + "/ws/test");
connection.onmessage = function(e) {
  alert(e.data);
}
header_file.addEventListener('change',()=>{
  list=header_img.getElementsByTagName("img")
  if(list.length!=0){
    for(var l of list){
      l.remove()
    }
  }
  list_2=header_img.getElementsByTagName("h1")
  if(list_2.length!=0){
    for(var m of list){
      m.remove()
    }
  }
  header_img.style.border="0"
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
    img.classList.add("img_h")
    img.src = imageUrl; // URLをimg要素にセット
    img.alt=file.name
    parent.innerHTML=""
    parent.appendChild(img); // #previewの中に追加
  }
  reader.readAsDataURL(file);
}
var i=false
editor.on('change',()=>{
  var ele=document.getElementById("show")
  num=editor.getValue().match(/\r\n|\n/g)
  n=0
  if(num==null){
    n=0
  }
  else{
    n=num.length
  }
  if(i!=n){
    ele.innerHTML =""
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
      if(quote.classList.contains("twitter-tweet")){}
      else{
        quote.classList.add("font")
        quote.classList.add("quote")
      }
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
    var iframe_list=ele.getElementsByTagName("iframe")
    for(var iframe of iframe_list){
      iframe.width="90%"
      iframe.height=(iframe.contentWindow.document.body.scrollHeight/iframe.contentWindow.document.body.scrollWidth)*0.9*parseInt(window.getComputedStyle(ele).width)+ "px";
    }
    var a_list=ele.getElementsByTagName("a")
    func_list=[]
    for(var a of a_list){
      console.log(a.parentNode.classList.contains("twitter-tweet"))
      if(a.parentNode.classList.contains("twitter-tweet")){
        func_list.push(new Promise((resolve,reject) => {resolve()}))
      }
      else if(a.parentNode.parentNode.classList.contains("twitter-tweet")){}
      else{
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
            a.classList.add("link")
            resolve()
          }
          connection.send(JSON.stringify({"data":a.href}))
        }))
      }
    }
    Promise.all(func_list)
    MathJax.Hub.Configured();
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, ele]);
    i=n
  }else{
  }
  
})

function func_submit(){
  var fd = new FormData();
  var tag = document.getElementById("input_tags")
  fd.append("header_file",header_file.files[0])
  for (let i = 0; i < file_datas.getAll("file").length; i++) {
    fd.append("images",file_datas.getAll("file")[i])
  }
  fd.append("title",title.value)
  var imgs=ele.getElementsByTagName("img")
  for(var image of imgs){
    console.log(image.getAttribute('alt'))
    if(!(image.getAttribute('alt')=="image")){
      image.src="https://eagle-moyashi-daily.s3.ap-northeast-1.amazonaws.com/"+image.getAttribute('alt')
    }
  }
  fd.append("inside",editor.getValue())
  fd.append("id",id.value)
  fd.append("tag","#"+tag.value)
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:8000/new_page/");
  xhr.send(fd);
}