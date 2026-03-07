import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  // Types for migration
  // Old system had a very simple user profile.
  type OldUserProfile = {
    name : Text;
  };

  // Old actor type.
  type OldActor = {
    clubs : Map.Map<Nat, { id : Nat; name : Text; slug : Text; description : Text }>;
    posts : Map.Map<Nat, { id : Nat; title : Text; body : Text; category : { #Announcement; #Update; #Event }; clubId : ?Nat; authorName : Text; timestamp : Int; eventDate : ?Int; imageUrl : ?Text }>;
    notifications : Map.Map<Nat, { id : Nat; message : Text; timestamp : Int; isRead : Bool; relatedPostId : ?Nat }>;
    githubProjects : Map.Map<Nat, { id : Nat; title : Text; repoUrl : Text; authorName : Text; description : Text; timestamp : Int }>;
    activityEntries : Map.Map<Nat, { id : Nat; action : Text; timestamp : Int; actorName : Text; clubId : ?Nat }>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
    nextPostId : Nat;
    nextNotificationId : Nat;
    nextGitHubProjectId : Nat;
    nextActivityId : Nat;
    categories : Map.Map<Text, { #Announcement; #Update; #Event }>;
  };

  // New richer user profile
  type NewUserProfile = {
    name : Text;
    email : Text;
    role : Text;
    branch : Text;
    year : Text;
    bio : Text;
    contactEmail : Text;
    linkedIn : Text;
    github : Text;
    portfolio : Text;
  };

  // New actor type.
  type NewActor = {
    clubs : Map.Map<Nat, { id : Nat; name : Text; slug : Text; description : Text }>;
    posts : Map.Map<Nat, { id : Nat; title : Text; body : Text; category : { #Announcement; #Update; #Event }; clubId : ?Nat; authorName : Text; timestamp : Int; eventDate : ?Int; imageUrl : ?Text }>;
    notifications : Map.Map<Nat, { id : Nat; message : Text; timestamp : Int; isRead : Bool; relatedPostId : ?Nat }>;
    githubProjects : Map.Map<Nat, { id : Nat; title : Text; repoUrl : Text; authorName : Text; description : Text; timestamp : Int }>;
    activityEntries : Map.Map<Nat, { id : Nat; action : Text; timestamp : Int; actorName : Text; clubId : ?Nat }>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
    nextPostId : Nat;
    nextNotificationId : Nat;
    nextGitHubProjectId : Nat;
    nextActivityId : Nat;
    categories : Map.Map<Text, { #Announcement; #Update; #Event }>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_principal, oldUserProfile) {
        {
          name = oldUserProfile.name;
          email = "";
          role = "";
          branch = "";
          year = "";
          bio = "";
          contactEmail = "";
          linkedIn = "";
          github = "";
          portfolio = "";
        };
      }
    );
    { old with userProfiles = newUserProfiles };
  };
};
