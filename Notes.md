## Issues
- [x] isAdmin (authJwt) does not play nice with front end
    - [x] currently removed so we can work on those pages, but will need to be fixed eventually

## To-Do
- [x] populate user roles with more than ids
- [x] useParams for :id routes
- [x] add LogOut function to Layout
- [x] refactor updateUser to just update roles / makeAdmin checkbox (?)
    - [x] probably will require backend work too
    - [x] figure out how to hide roles that are already present in user.roles
- [x] deleteUser
- [x] addToFavorites
    - [x] something to check whether location is already in favorites on SearchDetail
- [x]removeFromFavorites
- [x] addToSearchHistory
    - [x] limit to 15-20 results
- [x] connect Statistics to SearchDetail
    - [x] requires slight refactoring 
- [x] create and use utils for frequent functions
- [] styling...