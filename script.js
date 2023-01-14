const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];
// Show Modal, Focus on Input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Modal EventListeners

modalShow.addEventListener('click',showModal);
modalClose.addEventListener('click',()=>{
    modal.classList.remove('show-modal');
});

window.addEventListener('click',(e)=>(e.target == modal ? modal.classList.remove('show-modal'):false));

// Validate Form
function validate(nameValue,urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);

    if(!nameValue || !urlValue){
        alert('Please submit value for both fields');
        return false;
    }
  
    if(!urlValue.match(regex)) {
        alert('Plese provide a valid web address');
        return false;
    }

    // Valid
    return true;
}

// Fetch Bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage if available
    var data = localStorage.getItem('bookmarks');
    if(data){
        bookmarks = JSON.parse(data);
    }else{
        // Create bookmarks array in localStorage
        bookmarks = [
            {
            name:'Ansari Design',
            url:'https://github/sabanansari',
        }
        ];
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

}

// Handle Data from Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;

    if(!urlValue.includes('http://') && !urlValue.includes('https://')){
        urlValue = `https://${urlValue}`;
    }

   if(!validate(nameValue,urlValue)){
    return false;
   }
   const bookmark = {
    name:nameValue,
    url: urlValue,
   };

   bookmarks.push(bookmark);

    //Storing to local Storage    
   localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
   fetchBookmarks();
   bookmarkForm.reset();
   websiteNameEl.focus();

}

// Even Listener
bookmarkForm.addEventListener('submit', storeBookmark);

//On Load, Fetch Bookmarks
fetchBookmarks();