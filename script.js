
        let imageArray = new Array();
        let newImage = new Image();
newImage.src = 'path/to/your/image.jpg';
imageArray.push(newImage);
let existingImage = document.getElementById('existingImage');
imageArray.push(existingImage);
let imageData = {
  image: newImage,
  title: 'Image Title',
  description: 'A description of the image.'
};

imageArray.push(imageData);
        // Load statuses from localStorage or initialize an empty array
        let status = JSON.parse(localStorage.getItem('statuses')) || [];

        // Fake user data for posts
        const users = [
            { name: 'Leng Dara', profilePic: 'imgs/dara.jpg' },
            { name: 'Chan Thouch', profilePic: 'imgs/thouc.jpg' },
            { name: 'Sien Serey', profilePic: 'imgs/me.jpg' },
            { name: 'Kor Marn', profilePic: 'imgs/man.jpg' }
        ];

        // Function to add a new status
        function addToStatus(event) {
            event.preventDefault();
            let statusValue = document.querySelector('#input').value;
            let now = new Date();
            let randomUser = users[Math.floor(Math.random() * users.length)]; // Randomly assign a user

            let statusObj = {
                text: statusValue,
                date: now.getTime(), // Store timestamp (milliseconds) for accurate time comparison
                user: randomUser
            };

            status.unshift(statusObj); // Add new post at the beginning (new posts on top)
            localStorage.setItem('statuses', JSON.stringify(status)); // Save to localStorage
            displayStatus();
            document.querySelector('#input').value = ''; // Clear the input field
        }

        // Function to display the time difference
        function timeAgo(date) {
            let now = new Date();
            let diff = now - new Date(date); // Use stored timestamp for accurate comparison
            let seconds = Math.floor(diff / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);
            let months = Math.floor(days / 30);
            let years = Math.floor(days / 365);

            if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
            if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
            if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
            if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }

        // Function to display all statuses
        function displayStatus() {
            let content = document.querySelector('#content');
            content.innerHTML = status.map((item, index) => {
                if (!item.user) {
                    console.error("Error: Missing user in status object:", item);
                    return ''; // If no user, don't display the post
                }

                return `
                    <div class="status-item d-flex">
                        <img src="${item.user.profilePic}" alt="Profile Pic" class="profile-pic">
                        <div>
                            <h5 class="user-info">${item.user.name}</h5>
                            <p class="status-text">${item.text}</p>
                            <small class="time-ago">${timeAgo(item.date)}</small>
                        </div>
                        <button class="delete-btn" onclick="deleteStatus(${index})">&times;</button>
                    </div>
                `;
            }).join('');
        }

        // Function to delete a status
        function deleteStatus(index) {
            status.splice(index, 1); // Remove the status at the specified index
            localStorage.setItem('statuses', JSON.stringify(status)); // Save updated status list to localStorage
            displayStatus(); // Re-render the status list
        }

        // Initial display of statuses
        displayStatus();

        // Form submit event listener
        document.querySelector('#statusForm').addEventListener('submit', addToStatus);
