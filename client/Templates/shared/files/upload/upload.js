uploadedImage = new ReactiveVar(undefined);

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      instance = template;
      const upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          //alert('File "' + fileObj.name + '" successfully uploaded');
          var image_id = fileObj._id;

          $("input[name=image_id]").val(image_id);
          uploadedImage.set(image_id);

        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});
