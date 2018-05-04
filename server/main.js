import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  let users = Meteor.users.find().fetch();
  if(users.length == 0){
    // First startup, creating admin user.
    console.log("First startup, init app");
    Accounts.createUser({username:"admin", password:"admin"});
    Accounts.createUser({username:"Baptiste Thevelein", password:"Org@nisationDcables"});
    Accounts.createUser({username:"Benoît Michaëly", password:"QuiNeS@utepas69"});

  }
});
