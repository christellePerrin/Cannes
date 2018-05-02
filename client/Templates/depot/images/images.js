Template.depotimages.helpers({
  "images" : function(){
    return Images.find({},{sort:{"meta.createdAt":-1}});
  },
})


Template.showPhoto.events({
  "click button.valider" : function(e,t){
    e.preventDefault();
    let legend = t.find("input[name=legend]").value.trim();
    let image_id = t.find("input[name=image_id]").value;
    console.log(legend, image_id);
    if(legend){
      Images.update({_id:image_id},{$set:{"meta.legend":legend}});  
    }
  }
});
