MicroModal.init();

var fd = new FormData();
space = document.getElementById("space")
var submitbutton = document.getElementById("submit_button")
var title = document.getElementById("title")
var connection = new WebSocket("wss://" + window.location.host + "/ws/test");
var header_file=document.getElementById('header_file')
var header_img=document.getElementById('header_img')
var tag= document.getElementById('tag')
header_file.addEventListener('change',()=>{
  list=header_img.getElementsByTagName("img")
  if(list.length!=0){
    for(var l of list){
      l.remove()
    }
  }
  list_2=header_img.getElementsByTagName("h1")
  console.log(list_2)
  if(list_2.length!=0){
    for(var m of list_2){
      m.remove()
    }
  }
  header_img.style.border="0"
  fd.append("header_file",header_file.files[0])
  f_haeder(header_file.files[0],header_img)
})


function converter(ele){
    func_list=[]
    var ele_converted = marked(ele)
    var div = document.createElement('div');
    div.innerHTML=ele_converted
    div.onclick=""
    div.addEventListener('click',onclick_func)
    var h1_list=div.getElementsByTagName("h1")
    for(var h1 of h1_list){
      h1.classList.add("text")
      h1.classList.add("h1")
    }
    var h2_list=div.getElementsByTagName("h2")
    for(var h2 of h2_list){
      h2.classList.add("text")
      h2.classList.add("h2")
    }
    var h3_list=div.getElementsByTagName("h3")
    for(var h3 of h3_list){
      h3.classList.add("text")
      h3.classList.add("h3")
    }
    var p_list=div.getElementsByTagName("p")
    for(var p of p_list){
      p.classList.add("text")
      p.classList.add("p")
    }
    var quote_list=div.getElementsByTagName("blockquote")
    for(var quote of quote_list){
      if(quote.classList.contains("twitter-tweet")){}
      else{
        quote.classList.add("text")
        quote.classList.add("quote")
      }
    }
    var li_list=div.getElementsByTagName("li")
    for(var li of li_list){
      li.classList.add("text")
      li.classList.add("li")
    }
    var ol_list=div.getElementsByTagName("ol")
    for(var ol of ol_list){
      ol.classList.add("text")
      ol.classList.add("ol")
    }
    var ul_list=div.getElementsByTagName("ul")
    for(var ul of ul_list){
      ul.classList.add("text")
      ul.classList.add("ol")
    }
    var table_list=div.getElementsByTagName("table")
    for(var table of table_list){
      table.classList.add("text")
      table.classList.add("table")
    }
    var td_list=div.getElementsByTagName("td")
    for(var td of td_list){
      td.classList.add("text")
      td.classList.add("t")
    }
    var th_list=div.getElementsByTagName("th")
    for(var th of th_list){
      th.classList.add("text")
      th.classList.add("t")
    }
    var img_list=div.getElementsByTagName("img")
    for(var img of img_list){
      var span = document.createElement("div")
      var input = document.createElement("input")
      input.type="file"
      input.addEventListener("change",onchange)
      img.parentElement.parentElement.removeEventListener('click', onclick_func, false);
      span.insertAdjacentText('afterbegin','![img](')
      span.appendChild(input)
      span.insertAdjacentText('beforeend',')')
      img.parentElement.replaceWith(span);
    }
    div.querySelectorAll('pre code[class^="language-"]').forEach(block => {
        block.parentNode.classList.remove("font_code")
        block.classList.remove("font_code")
        hljs.highlightBlock(block)
        block.parentNode.classList.add("font_code")
        block.classList.add("font_code")
    })
    var code_list=div.getElementsByTagName("code")
    for(var code of code_list){
      code.parentNode.classList.add("font_code")
      code.classList.add("font_code")
    }
    var a_list=div.getElementsByTagName("a")
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
    return div
}

document.addEventListener('keyup', (event) => {
    if (event.shiftKey) {
        if (event.key === 'Enter') {
            var curElement = document.activeElement;
            if(curElement.parentElement.parentElement.id=="space"){
                var div=converter(curElement.innerText)
                var hidden=document.createElement("input")
                hidden.type="hidden"
                hidden.value=curElement.innerText
                console.log(curElement.parentElement)
                curElement.parentElement.name=(curElement.innerText)
                curElement.parentElement.append(div)
                curElement.parentElement.append(hidden)
                curElement.remove()
            }else{
                var div=converter(curElement.innerText)
                MathJax.Hub.Queue(["Typeset",MathJax.Hub,div]);
                var hidden=document.createElement("input")
                hidden.type="hidden"
                hidden.value=curElement.innerText
                div.append(hidden)
                space.append(div)
            }
            curElement.textContent=""
            }
        }
    })

function onclick_func(obj){
    if(this.children[0].tagName=="SPAN"){
    }else{
        var main=this.getElementsByTagName("input")[0].value
        this.innerHTML=""
        this.innerHTML="<span class='textarea' role='textbox' contenteditable></span>"
        var span=this.getElementsByTagName("span")[0]
        span.innerText=main
    }
}

function onclick_func_img(obj){
  if(this.children[0].tagName=="SPAN"){
  }else{
      this.querySelectorAll('img').forEach(block => {
        var div = document.createElement("div")
        div.innerHTML="![img](<input type='file'>)"
        block.replaceWith(div)
      })
      this.querySelectorAll('input[type="file"]').forEach(block => {
        block.addEventListener("change",onchange)
      })
  }
}

function onchange(obj){
  console.log(this.parentElement.parentElement)
  this.parentElement.parentElement.querySelectorAll('input[type="hidden"]').forEach(block => {
    block.value="![img](https://eagle-moyashi-daily.s3.ap-northeast-1.amazonaws.com/"+this.files[0].name+")"
  })
  this.parentElement.parentElement.addEventListener('click', onclick_func_img)
  this.classList.add('header_file')
  fd.append("images",this.files[0])
  f(this.files[0],this.parentElement)
}

function f(file,parent){
    reader = new FileReader();
    var img = document.createElement("img");
    reader.onload = function (e) {
      var imageUrl = e.target.result; // URLはevent.target.resultで呼び出せる
      var img = document.createElement("img"); // img要素を作成
      img.classList.add("img_h")
      img.src = imageUrl; // URLをimg要素にセット
      img.alt=file.name
      parent.replaceWith(img); // #previewの中に追加
    }
    reader.readAsDataURL(file);
}
function f_haeder(file,parent){
  reader = new FileReader();
  var img = document.createElement("img");
  reader.onload = function (e) {
    var imageUrl = e.target.result; // URLはevent.target.resultで呼び出せる
    var img = document.createElement("img"); // img要素を作成
    img.classList.add("img_h")
    img.src = imageUrl; // URLをimg要素にセット
    img.alt=file.name
    parent.prepend(img); // #previewの中に追加
  }
  reader.readAsDataURL(file);
}

submitbutton.addEventListener("click",()=>{
  inside=""
  inside_list=[]
  for(var child of space.children){
    child.querySelectorAll('input[type="hidden"]').forEach(block => {
      inside_list.push(block.value)
    })
  }
  inside=inside_list.join("\n")
  fd.append("inside",inside)
  fd.append("title",title.value)
  fd.append("tag","#"+tag.value)
  console.log(fd)
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://eagle-moyashi-daily.herokuapp.com//new_page/");
  xhr.send(fd);
})
