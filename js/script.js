//封装一个代替getElementByID()的方法
function byId(id){
    return typeof(id)==="string"?document.getElementById(id):id;
}

var index = 0,
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    len = pics.length,
    prev = byId("prev"),
    next = byId("next"),
    menu = byId("menu-content"),
    subMenu = byId("sub-menu"),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    menuItems = menu.getElementsByClassName("menu-item");

function slideImg(){
    var main=byId("main");
    //滑过清除定时器，离开继续
    main.onmouseover=function(){
        //滑过清除定时器
        if(timer){
            clearInterval(timer);
        }
    }
    main.onmouseout=function(){
        timer = setInterval(function(){
            index++;
            if(index>=len){
                index=0;
            }
            //切换图片
            changeImg();
        },2000);
    }
    //自动在main上触发鼠标离开事件
    main.onmouseout();

    //点击圆点切换图片
    for(var d=0; d<len; d++){
        dots[d].id = d;
        dots[d].onclick=function(){
            index=this.id;
            changeImg();
        }
    }

    //点击下一张按钮切换图片
    next.onclick=function(){
        index++;
        if(index>=len){
            index=0;
        }
        changeImg();
    }
    //点击上一张按钮切换图片
    prev.onclick=function(){
        index--;
        if(index<0){
            index=len-1;
        }
        changeImg();
    }

    //导航菜单
    //遍历主菜单，且绑定事件
    for(var m=0; m<menuItems.length; m++){
        //给每个主菜单定义一个data-index属性，作为索引
        menuItems[m].setAttribute("data-index",m);
        menuItems[m].onmouseover=function(){
            var idx=this.getAttribute("data-index");
            for(var j=0; j<innerBox.length; j++){
                innerBox[j].style.display="none";
            }
            subMenu.className="sub-menu";
            innerBox[idx].style.display="block";
        }
    }
    
    menu.onmouseout=function(){
        subMenu.className="sub-menu hide";
    }
    subMenu.onmouseover=function(){
        subMenu.className="sub-menu";
    }
    subMenu.onmouseout=function(){
        subMenu.className="sub-menu hide";
    }
}

//切换图片
function changeImg(){
    //遍历banner下所有div，将其隐藏
    for(i=0; i<len; i++){
        pics[i].style.opacity="0";
        dots[i].className="";
    }
    //找到当前div将其显示
    pics[index].style.opacity="1";
    dots[index].className="active";
}

slideImg();
