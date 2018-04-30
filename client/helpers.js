Template.registerHelper('formatedDate', function(date) {
    if(date == undefined) date = new Date();
    return moment(date).format('MM-DD-YYYY');
});
