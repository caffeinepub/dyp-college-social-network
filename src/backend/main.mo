import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  public type PostCategory = {
    #Announcement;
    #Update;
    #Event;
  };

  public type Club = {
    id : Nat;
    name : Text;
    slug : Text;
    description : Text;
  };

  public type Post = {
    id : Nat;
    title : Text;
    body : Text;
    category : PostCategory;
    clubId : ?Nat;
    authorName : Text;
    timestamp : Int;
    eventDate : ?Int;
    imageUrl : ?Text;
  };

  public type Notification = {
    id : Nat;
    message : Text;
    timestamp : Int;
    isRead : Bool;
    relatedPostId : ?Nat;
  };

  public type GitHubProject = {
    id : Nat;
    title : Text;
    repoUrl : Text;
    authorName : Text;
    description : Text;
    timestamp : Int;
  };

  public type ActivityEntry = {
    id : Nat;
    action : Text;
    timestamp : Int;
    actorName : Text;
    clubId : ?Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  // Persistent storage
  let clubs = Map.empty<Nat, Club>();
  let posts = Map.empty<Nat, Post>();
  let notifications = Map.empty<Nat, Notification>();
  let githubProjects = Map.empty<Nat, GitHubProject>();
  let activityEntries = Map.empty<Nat, ActivityEntry>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextPostId = 1;
  var nextNotificationId = 1;
  var nextGitHubProjectId = 1;
  var nextActivityId = 1;

  let categories = Map.empty<Text, PostCategory>();

  module PostCategory {
    public func compare(category1 : PostCategory, category2 : PostCategory) : Order.Order {
      func getCategoryScore(category : PostCategory) : Nat {
        switch (category) {
          case (#Announcement) { 0 };
          case (#Update) { 1 };
          case (#Event) { 2 };
        };
      };
      Nat.compare(getCategoryScore(category1), getCategoryScore(category2));
    };
  };

  // Authorization system with role-based access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Pre-seeding data function
  public shared ({ caller }) func preSeedData() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can pre-seed data");
    };

    // Pre-seed clubs
    let clubList = [
      {
        id = 1;
        name = "GDG";
        slug = "gdg";
        description = "Google Developer Group Club";
      },
      {
        id = 2;
        name = "ECELL";
        slug = "ecell";
        description = "Entrepreneurship Cell";
      },
      {
        id = 3;
        name = "Off. Theatre";
        slug = "off-theatre";
        description = "Official Theatre Club";
      },
      {
        id = 4;
        name = "Off. Dance";
        slug = "off-dance";
        description = "Official Dance Club";
      },
      {
        id = 5;
        name = "NCC";
        slug = "ncc";
        description = "National Cadet Corps";
      },
      {
        id = 6;
        name = "Off. Music";
        slug = "off-music";
        description = "Official Music Club";
      },
      {
        id = 7;
        name = "Student Council";
        slug = "student-council";
        description = "Student Council Body";
      },
      {
        id = 8;
        name = "General Clubs";
        slug = "general-clubs";
        description = "Clubs for general interest activities";
      },
      {
        id = 9;
        name = "Faculty";
        slug = "faculty";
        description = "Faculty-related club";
      },
      {
        id = 10;
        name = "NSS";
        slug = "nss";
        description = "National Service Scheme";
      },
      {
        id = 11;
        name = "SRC";
        slug = "src";
        description = "SRC Club";
      },
    ];

    clubList.values().forEach(func(club) { clubs.add(club.id, club) });

    categories.add("Announcement", #Announcement);
    categories.add("Update", #Update);
    categories.add("Event", #Event);

    // Pre-seed sample posts
    let now = Time.now();
    let samplePosts = [
      {
        id = nextPostId;
        title = "Welcome to the College Social Network";
        body = "This is an announcement post to welcome everyone!";
        category = #Announcement;
        clubId = null;
        authorName = "Admin";
        timestamp = 1718019529000000000;
        eventDate = null;
        imageUrl = null;
      },
      {
        id = nextPostId + 1;
        title = "Upcoming Tech Event";
        body = "Join us for a tech event hosted by GDG!";
        category = #Event;
        clubId = ?1;
        authorName = "GDG";
        timestamp = 1716144329000000000;
        eventDate = ?1720474729000000000;
        imageUrl = ?"event_image.jpg";
      },
      {
        id = nextPostId + 2;
        title = "New Dance Workshop";
        body = "Off. Dance Club is organizing a workshop next week.";
        category = #Event;
        clubId = ?4;
        authorName = "Off. Dance";
        timestamp = 1717192529000000000;
        eventDate = ?1717764529000000000;
        imageUrl = ?"dance_workshop.jpg";
      },
    ];

    samplePosts.values().forEach(func(post) {
      posts.add(post.id, post);
      nextPostId += 1;
    });

    // Pre-seed sample Github projects
    let sampleProjects = [
      {
        id = nextGitHubProjectId;
        title = "Social Network Backend";
        repoUrl = "https://github.com/example/backend";
        authorName = "Admin";
        description = "Motoko backend for the social network";
        timestamp = 1718019529000000000;
      },
      {
        id = nextGitHubProjectId + 1;
        title = "Frontend PWA";
        repoUrl = "https://github.com/example/frontend";
        authorName = "GDG";
        description = "Progressive Web App frontend";
        timestamp = 1716144329000000000;
      },
    ];

    sampleProjects.values().forEach(func(project) {
      githubProjects.add(project.id, project);
      nextGitHubProjectId += 1;
    });
  };

  // Public read operations - no authorization required (accessible to guests)
  public query ({ caller }) func getAllClubs() : async [Club] {
    clubs.values().toArray();
  };

  public query ({ caller }) func getPostsByCategory(category : PostCategory) : async [Post] {
    posts.values().toArray().filter(func(post) { post.category == category });
  };

  public query ({ caller }) func getPostsByClub(clubId : Nat) : async [Post] {
    posts.values().toArray().filter(func(post) {
      switch (post.clubId) {
        case (null) { false };
        case (?id) { id == clubId };
      };
    });
  };

  // Get upcoming events sorted by eventDate
  public query ({ caller }) func getUpcomingEvents() : async [Post] {
    let now = Time.now();
    let filteredPosts = posts.values().toArray().filter(func(post) {
      switch (post.category, post.eventDate) {
        case (#Event, ?eventDate) { eventDate > now };
        case (_) { false };
      };
    });

    filteredPosts.sort(
      func(a, b) {
        switch (a.eventDate, b.eventDate) {
          case (?adate, ?bdate) { Int.compare(adate, bdate) };
          case (_, _) { #equal };
        };
      }
    );
  };

  // Admin-only: Create post
  public shared ({ caller }) func createPost(title : Text, body : Text, categoryText : Text, clubId : ?Nat, authorName : Text, timestamp : Int, eventDate : ?Int, imageUrl : ?Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create posts");
    };

    let postCategory = switch (categories.get(categoryText)) {
      case (?category) { category };
      case (null) { Runtime.trap("Invalid category") };
    };

    let post : Post = {
      id = nextPostId;
      title;
      body;
      category = postCategory;
      clubId;
      authorName;
      timestamp;
      eventDate;
      imageUrl;
    };

    posts.add(nextPostId, post);
    let createdPostId = nextPostId;
    nextPostId += 1;

    // Add activity entry internally
    addActivityEntryInternal("Created post: " # title, timestamp, authorName, clubId);

    createdPostId;
  };

  // Public read - no authorization required
  public query ({ caller }) func getNotifications() : async [Notification] {
    notifications.values().toArray();
  };

  // User-only: Mark notification as read
  public shared ({ caller }) func markNotificationAsRead(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can mark notifications as read");
    };
    switch (notifications.get(id)) {
      case (null) { Runtime.trap("Notification not found") };
      case (?notification) {
        notifications.add(
          id,
          {
            id = notification.id;
            message = notification.message;
            timestamp = notification.timestamp;
            isRead = true;
            relatedPostId = notification.relatedPostId;
          },
        );
      };
    };
  };

  // User-only: Mark all notifications as read
  public shared ({ caller }) func markAllNotificationsAsRead() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can mark notifications as read");
    };
    notifications.forEach(
      func(id, notification) {
        notifications.add(
          id,
          {
            id = notification.id;
            message = notification.message;
            timestamp = notification.timestamp;
            isRead = true;
            relatedPostId = notification.relatedPostId;
          },
        );
      }
    );
  };

  // Public read - no authorization required
  public query ({ caller }) func getUnreadNotificationCount() : async Nat {
    notifications.values().toArray().foldLeft(
      0,
      func(acc, notification) {
        if (not notification.isRead) { acc + 1 } else { acc };
      },
    );
  };

  // User-only: Add GitHub project
  public shared ({ caller }) func addGitHubProject(title : Text, repoUrl : Text, authorName : Text, description : Text, timestamp : Int) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add GitHub projects");
    };

    let project : GitHubProject = {
      id = nextGitHubProjectId;
      title;
      repoUrl;
      authorName;
      description;
      timestamp;
    };

    githubProjects.add(nextGitHubProjectId, project);
    nextGitHubProjectId += 1;

    // Create a notification for new GitHub project
    let notification : Notification = {
      id = nextNotificationId;
      message = "New GitHub project added: " # title;
      timestamp;
      isRead = false;
      relatedPostId = null;
    };
    notifications.add(nextNotificationId, notification);
    nextNotificationId += 1;

    // Add activity entry internally
    addActivityEntryInternal("Added GitHub project: " # title, timestamp, authorName, null);

    project.id;
  };

  // Public read - no authorization required
  public query ({ caller }) func getAllGitHubProjects() : async [GitHubProject] {
    githubProjects.values().toArray();
  };

  // Public read - no authorization required
  public query ({ caller }) func getSortedActivityFeed() : async [ActivityEntry] {
    let activityList = activityEntries.values().toArray();
    activityList.sort(func(a, b) { Int.compare(b.timestamp, a.timestamp) });
  };

  // Internal function to add activity entries (not exposed publicly)
  private func addActivityEntryInternal(action : Text, timestamp : Int, actorName : Text, clubId : ?Nat) {
    let activity : ActivityEntry = {
      id = nextActivityId;
      action;
      timestamp;
      actorName;
      clubId;
    };

    activityEntries.add(nextActivityId, activity);
    nextActivityId += 1;
  };

  // Public read - no authorization required
  public query ({ caller }) func getAllClubPosts() : async [Post] {
    posts.values().toArray().filter(func(post) { post.category == #Event });
  };

  // Public read - no authorization required
  public query ({ caller }) func getRecentPosts(limit : Nat) : async [Post] {
    let postList = posts.values().toArray();
    let sortedPosts = postList.sort(
      func(a, b) { Int.compare(b.timestamp, a.timestamp) }
    );
    let limitNat = if (sortedPosts.size() < limit) { sortedPosts.size() } else { limit };
    sortedPosts.sliceToArray(0, limitNat);
  };

  // Admin-only: Clear all data
  public shared ({ caller }) func clearAllData() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can clear data");
    };

    // Reset posts and IDs
    posts.clear();
    notifications.clear();
    githubProjects.clear();
    activityEntries.clear();
    nextPostId := 1;
    nextNotificationId := 1;
    nextGitHubProjectId := 1;
    nextActivityId := 1;
  };
};
