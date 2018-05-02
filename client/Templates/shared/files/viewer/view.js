Template.showFiles.helpers({
  "files" : function(){
    return Images.find();
  },
})

Template.viewfile.helpers({

    "isInUse" : function(id){
      return Article.find({image_id:id}).fetch().length > 0;
    }

})


Template.showFiles.events({
  "click span.ev_removeMe" : function(){
    console.log(this._id);
    if(confirm("Etes vous sur ?")){
      Images.remove({_id:this.file._id});
    }
  }
})
