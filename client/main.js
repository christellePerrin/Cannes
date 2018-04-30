Template.ApplicationLayout.events({
  "click a.toolbar" : function(e,t){
    console.log(e.target);
    $("a.toolbar").each(function(i,e){
      $(e).removeClass("active");
    })
    $(e.target).addClass("active");
  }
});
