Template.depotimages.helpers({
  "images" : function(){
    return Images.find({},{sort:{"meta.createdAt":-1}});
  },
})


Template.showPhoto.events({
  "submit" : function(e,t){
    e.preventDefault();
    let legend = t.find("input[name=legend]").value.trim();
    let image_id = t.find("input[name=image_id]").value;
    console.log(legend, image_id);
    if(legend){
      Images.update({_id:image_id},{$set:{"meta.legend":legend}});  
      $(t.find("div#image_" + image_id)).addClass("highlight");
      Meteor.setTimeout(function(){
        $(t.find("div#image_" + image_id)).removeClass("highlight");
      }, 150);
      
    }
  },

  "click span.ev_removeMe" : function(e,t){
    console.log(this);
    if(confirm("R U SUR ?")) Images.remove({_id:this.image._id});
  }
});
