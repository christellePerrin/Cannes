//Disposition des medias
function getRandomInt(min, max) {
  return Math.floor(Math.random() * Math.floor(max)) + min;
}

Template.restitution.helpers({
  medias(){
    // TODO : mettre l'id de l'article dans meta.article_id
   var start = new Date();
    start.setHours(0,0,0,0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    var articles = Article.find().fetch();
  /*  ne prenant que les articles des derniers 24H (remplacer dans les () du find)
  ({
     createdAt : {
       $gte:start.getTime(),
       $lt : end.getTime()
     }
   })
   */

    var ids = [];
    _.each(articles, function(article){
      if(article.image_id != "") ids.push(article.image_id);
    });
    var images = Images.find().fetch();

  /*  ne prenant que les photos des derniers 24H (remplacer dans les () du find)
  ({
    _id: {$nin : ids},
    "meta.createdAt" : {
      $gte:start.getTime(),
      $lt : end.getTime()
    }
  })
    */

    var data = _.union(articles, images);
    _.each(data, function(media){
      media.position = {x:getRandomInt(10,1000), y: getRandomInt(20,10000)};
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
  },
  auteur(){
    let userId = null;
    if(this.media.isArticle){
      userId = this.media.owner;
    }else{
      userId = this.media.userId;
    }
    let auteur = Meteor.users.findOne({_id:userId});
    if (auteur) {
      return auteur.username;
    }else{
      return "anonyme";
    }
  }
});

Template.mediaArticle.helpers({
  getImageFromId(id){
    console.log(id);
    if(id){
      return Images.findOne({_id:id}).link();
    }
  },
});

var selected = null, // Object of the element to be moved
x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element




var medias = document.getElementById("medias");
function click(){
}
function doubleClick(){
}
var clickCount = 0;


Template.showMedia.events({
  //déployer les fenetres si on clique sur le carré
  'click .deploy': function(e,t) {
    console.log("deploy");
    e.preventDefault();
    e.stopPropagation();
    element = e.target;
  //  $(element).removeClass("deploy").addClass("deploy2");

    while(!$(element).hasClass("medias")){
      element = element.parentNode;
    }
    $(element).removeClass("medias").addClass("fullscreen");
    contenu = $(t.find(".chapo_hidden"));
    contenu.removeClass("chapo_hidden").addClass("chapo_rest");
    contenu = $(t.find(".contenu_rest"));
    contenu.removeClass("contenu_rest").addClass("contenu_hidden");
    contenu = $(t.find(".legendeimg"));
    contenu.removeClass("legendeimg").addClass("legendeimgbig");
    img = $(t.find(".preview_rest"));
    img.removeClass("preview_rest").addClass("preview_hidden");
  },

////////déployer davantage
  'click .deploy2': function(e,t) {
  console.log("deploy2");
  e.preventDefault();
  e.stopPropagation();
  element = e.target;

  while(!$(element).hasClass("fullscreen")){
    element = element.parentNode;
  }
  img = $(t.find(".chapo_rest"));
  img.removeClass("chapo_rest").addClass("chapo_hidden");
  $(element).removeClass("fullscreen").addClass("fullscreen_all");
  contenu = $(t.find(".contenu_hidden"));
  contenu.removeClass("contenu_hidden").addClass("contenu_rest");
  img = $(t.find(".preview_rest"));
  img.removeClass("preview_rest").addClass("preview_hidden");
},


  //fermer les fenetres si on clique sur la X
  'click .close': function(e,t) {
    console.log("Close");
    e.preventDefault();
    e.stopPropagation();
    element = e.target;

    while(!$(element).hasClass("fullscreen_all") && !$(element).hasClass("fullscreen")){
      element = element.parentNode;
    }
    $(element).removeClass("fullscreen_all").removeClass("fullscreen").addClass("medias");
    contenu = $(t.find(".contenu_rest"));
    contenu.removeClass("contenu_rest").addClass("contenu_hidden");
    contenu = $(t.find(".legendeimgbig"));
    contenu.removeClass("legendeimgbig").addClass("legendeimg");
    img = $(t.find(".preview_hidden"));
    img.removeClass("preview_hidden").addClass("preview_rest");
  },

//dblclick

  "dblclick .medias" : function(e,t){
    console.log("click");
  },
  "click .medias" : function(e,t){
    e.preventDefault();
    e.stopPropagation();
    element = e.target;

    while(!$(element).hasClass("medias")){
      element = element.parentNode;
    }
    console.log("doubleClick");
    console.log(element);
    $(element).removeClass("medias").addClass("fullscreen");
    chapo = $(t.find(".chapo_hidden"));
    chapo.removeClass("chapo_hidden").addClass("chapo_rest");
    contenu = $(t.find(".legendeimg"));
    contenu.removeClass("legendeimg").addClass("legendeimgbig");
    find(".chapo_hidden").removeClass("chapo_hidden").addClass("chapo_rest");
  },


  "click .fullscreen" : function(e,t){
    e.preventDefault();
    e.stopPropagation();
    element = e.target;

    while(!$(element).hasClass("fullscreen")){
      element = element.parentNode;
    }
    $(element).removeClass("fullscreen").addClass("fullscreen_all");
    chapo = $(t.find(".chapo_rest"));
    chapo.removeClass("chapo_rest").addClass("chapo_hidden");
    contenu = $(t.find(".contenu_hidden"));
    contenu.removeClass("contenu_hidden").addClass("contenu_rest");
    img = $(t.find(".preview_rest"));
    img.removeClass("preview_rest").addClass("preview_hidden");
  },


  "click .fullscreen_all" : function(e,t){
    e.preventDefault();
    e.stopPropagation();
    element = e.target;

    while(!$(element).hasClass("fullscreen_all")){
      element = element.parentNode;
    }
    $(element).removeClass("fullscreen_all").addClass("medias");
    contenu = $(t.find(".contenu_rest"));
    contenu.removeClass("contenu_rest").addClass("contenu_hidden");
    contenu = $(t.find(".legendeimgbig"));
    contenu.removeClass("legendeimgbig").addClass("legendeimg");
    img = $(t.find(".preview_hidden"));
    img.removeClass("preview_hidden").addClass("preview_rest");
  },



/*
"mousedown .medias" : function(e,t){
  e.preventDefault();
  e.stopPropagation();
  //e.stopImmediatePropagation();
  //console.log("MouseDOWN", e.clientX, e.clientY);
  // Store the object of the element which needs to be moved
  selected = e.target;

  if(!$(selected).hasClass("medias")){
    selected = selected.parentNode;
  }
  var elements = $(".medias");
  _.each(elements, function(element){
    $(element).removeClass("selected").addClass("notselected");
  });
  $(selected).addClass("selected").removeClass("notselected");

  x_elem = x_pos - selected.offsetLeft;
  y_elem = y_pos - selected.offsetTop;
},

"mouseup .medias" : function(e,t){
  //e.stopImmediatePropagation();
  e.preventDefault();
  e.stopPropagation();
  //console.log(e.clientX, e.clientY);
  selected = null;
},
*/
'mousemove .medias': function (e) {
  e.preventDefault();
  e.stopPropagation();
  ///e.stopImmediatePropagation();
  //console.log(selected, e.clientX, e.clientY);
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
