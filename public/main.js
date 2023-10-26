document.addEventListener('DOMContentLoaded', function() {
    // Get the dropdown button and the dropdown content
    var dropdownButton = document.getElementById('dropdownNavbarLink');
    var dropdownContent = document.getElementById('themesDropdown');

    // Toggle the display of the dropdown content when the button is clicked
    dropdownButton.addEventListener('click', function() {
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    });

    // Close the dropdown if clicked outside
    window.onclick = function(event) {
        if (!event.target.matches('#dropdownNavbarLink')) {
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            }
        }
    }

   // Fetch the data from the server
   fetch('/lego/sets')
   .then(response => response.json())
   .then(data => {
       // Extract unique themes
       const themes = [...new Set(data.map(item => item.theme))];

       // Clear any existing items from the dropdown
       dropdownContent.innerHTML = '';

       // Add each unique theme to the dropdown
       themes.forEach(theme => {
           const li = document.createElement('li');
           const a = document.createElement('a');
           a.href = "#"; // Prevents the default link action
           a.className = "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white";
           a.textContent = theme;
           a.addEventListener('click', function(e) {
               e.preventDefault(); // Prevents the link from navigating
               fetchSetsByTheme(theme);
           });
           li.appendChild(a);
           dropdownContent.appendChild(li);
       });
   })
   .catch(error => {
       console.error('Error fetching data:', error);
   });
});

function fetchSetsByTheme(theme) {
   // Fetch sets based on the theme
   fetch(`/lego/sets?theme=${theme}`)
   .then(response => response.json())
   .then(data => {
       // Now you have the sets based on the theme.
       // You can process the data as you wish.
       console.log(data);
   })
   .catch(error => {
       console.error('Error fetching sets by theme:', error);
   });
}