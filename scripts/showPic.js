addLoadEvent(prepareGallery);
addLoadEvent(prepareLinks);
addLoadEvent(preparePlaceholder);	//与加载顺序无关吗????????

function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}	//html文档加载完毕后立马执行的函数
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,parent.nextSibling);
	}
}	//把一个节点插入到另一个节点之后
function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var txt=document.createTextNode("Choose an image.");
	description.appendChild(txt);
	var gallery=document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
}
function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for (var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this)?false:true;
		}
	}
}
function showPic(whichpic){
	if(!document.getElementById("placeholder")) return false;
	var source=whichpic.getAttribute('href');
	var placeholder=document.getElementById('placeholder');
	if(placeholder.nodeName!="IMG") return false;
	placeholder.setAttribute("src",source);
	//替换对应图片
	if(document.getElementById("description")){
		var text=whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
		var description=document.getElementById("description");
		if(description.firstChild.nodeType==3){
			description.firstChild.nodeValue=text;
			//替换对应文字
		}
	}
	return true;
}
function popUp(winURL){
	window.open(winURL,"popup","width=480,height=320");
}	//popUp函数,创建新的浏览器窗口
function prepareLinks(){
	if(!document.getElementById||!document.getElementsByTagName) return false;	//对象检测
	var newlink=document.getElementsByTagName("a");
	for(var i=0;i<newlink.length;i++){
		if(newlink[i].getAttribute("class")=="popup"){
			newlink[i].onclick=function(){
				popUp(this.getAttribute("href"));
				return false;	//阻止浏览器的默认行为
			}
		}
	}
}	//class="popup"的链接被点击时2调用popUp()函数



/*
function countBodyChildren(){
	var body_element=document.getElementsByTagName('body')[0];
	alert(body_element.childNodes.length); //子元素个数   // alert(body_element.nodeType);   节点类型

}
window.onload=countBodyChildren; //页面加载时执行函数countBodyChildren.   alert(body_element.childNodes.length);
*/



