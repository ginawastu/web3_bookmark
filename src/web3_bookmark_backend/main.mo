import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor BookmarkVault {
  type Bookmark = {
    url : Text;
    title : Text;
    tag : Text;
    timestamp : Time.Time;
  };

  stable var bookmarksEntries : [(Principal, [Bookmark])] = [];

  var bookmarks = HashMap.fromIter<Principal, [Bookmark]>(
    bookmarksEntries.vals(),
    10,
    Principal.equal,
    Principal.hash,
  );

  public func addBookmark(title : Text, url : Text, tag : Text) : async () {
    let user = Principal.fromActor(BookmarkVault);
    let entry : Bookmark = {
      url = url;
      title = title;
      tag = tag;
      timestamp = Time.now();
    };
    let current = bookmarks.get(user);
    let updated = switch (current) {
      case (null) [entry];
      case (?list) Array.append<Bookmark>(list, [entry]);
    };
    bookmarks.put(user, updated);
    bookmarksEntries := Iter.toArray(bookmarks.entries());
  };

  public query func getBookmarks() : async [Bookmark] {
    let user = Principal.fromActor(BookmarkVault);
    switch (bookmarks.get(user)) {
      case (?list) list;
      case null [];
    };
  };
};
