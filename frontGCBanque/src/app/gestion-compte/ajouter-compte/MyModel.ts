.breadcrumb-nav {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Add space between breadcrumb and button */
    padding: 10px 0; /* Adjust padding if necessary */
}

.breadcrumb-custom {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
}

.breadcrumb-item-custom {
    background-color: #bde1f8;
    color: rgb(12, 12, 12);
    padding: 10px 20px;
    position: relative;
    margin-right: 10px;
    clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);
    transition: box-shadow 0.3s ease, color 0.3s ease; /* Add transition for smooth effect */
    font-weight: normal; /* Default font weight */
}

.breadcrumb-item-custom a {
    color: rgb(1, 0, 14);
    text-decoration: none;
    font-weight: bold; /* Make text bold */
    color: darkblue; /* Dark blue color */
}

.breadcrumb-item-custom a:hover {
    text-decoration: underline;
}

.breadcrumb-item-custom:last-child {
    background-color: #acccee;
}

.breadcrumb-item-custom::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 10px solid #2c3e50;
    position: absolute;
    right: -10px;
    top: 0;
}

.breadcrumb-item-custom:last-child::after {
    border-left-color: transparent;
}

.breadcrumb-item-custom:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Add shadow on hover */
}

.breadcrumb-item-custom .close-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.button-container {
    margin-left: auto; /* Push the button to the right */
}

button.btn {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #2d21ae;
    border: none;
    color: white;
    cursor: pointer;
}

button.btn img {
    margin-left: 5px;
}
