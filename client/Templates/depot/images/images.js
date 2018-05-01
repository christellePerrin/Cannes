
Template.editPhoto.helpers({
  "selectedPhoto" : function(){
    return selectedPhoto.get();
  },
  "photohasbeenuploaded" : function(photo_id){
    if(selectedPhoto.get() === undefined){
      if(uploadedPhoto.get() != undefined){
        return true;
      } else {
        return false;
      }

    } else {
      return selectedPhoto.get().photo_id == uploadedPhoto.get();
    }
    return selectedPhoto.get().photo_id != null;
  },
});

Template.showPhoto.helpers({
  "showPhoto" : function(){
    if(selectedPhoto.get() == null){
      return Photos.findOne(uploadedPhotos.get());
    }
    return Photos.findOne(selectedPhotos.get().image_id);
  }
});

Template.editPhoto.events({
  "submit Photo" : function(e,t){
    e.preventDefault();
  if(selectedPhoto.get() === undefined){
    photo_id = Photo.insert(photo);
  } else {
    photo_id = Photo.update(selectedPhoto.get()._id, {$set:photo});
  }
},
});
