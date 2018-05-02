

function getRandomInt(min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min;
}

Template.restitution.helpers({
  medias(){
    var articles = Article.find().fetch();
    var ids = [];
    _.each(articles, function(article){
      if(article.image_id != "") ids.push(article.image_id);
    });
    var images = Images.find({_id: {$nin : ids}}).fetch();
    var data = _.union(articles, images);
    _.each(data, function(media){
      media.position = {x:getRandomInt(100,500), y: getRandomInt(100,500)}; 
    });
    return data;
  }
});


Template.showMedia.onRendered(function(){
  ///
});


Template.showMedia.helpers({
 render(){
  if(this.isArticle) return Template["mediaArticle"];
  else return Template["mediaImage"];
 }
});
var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

Template.showMedia.events({
  "click .medias" : function(e,t){
  },
  "mousedown .medias" : function(e,t){
    var elements = $(".medias");
    _.each(elements, function(element){
      $(element).removeClass("selected").addClass("notselected");
    });
    $(e.target).addClass("selected");
    //e.preventDefault();
    //console.log("MouseDOWN", e.clientX, e.clientY);
    // Store the object of the element which needs to be moved
    selected = e.target;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
  },
  "mouseup .medias" : function(e,t){
    //e.preventDefault();
    //console.log(e.clientX, e.clientY);
    selected = null;
  },
  'mousemove .medias': function (e) {
    //console.log(e.clientX, e.clientY);
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }

  }
});

Template.registerHelper("debug", function(data){
  console.log(data);
});
/*
 *

// Will be called when user starts dragging an element
function _drag_init(elem) {
    // Store the object of the element which needs to be moved
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }
}

// Destroy the object when we are done
function _destroy() {
    selected = null;
}

// Bind the functions...
document.getElementById('draggable-element').onmousedown = function () {
    _drag_init(this);
    return false;
};

document.onmousemove = _move_elem;
document.onmouseup = _destroy;
*/ 
