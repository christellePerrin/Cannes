Template.ApplicationLayout.events({
  "click a.toolbar" : function(e,t){
    $("a.toolbar").each(function(i,e){
      $(e).removeClass("active");
    })
    $(e.target).addClass("active");

    if(e.target.innerHTML.includes("Festival")){
      console.log("Hello");
    }


  }
});
