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
}

.breadcrumb-item-custom a {
    color: rgb(1, 0, 14);
    text-decoration: none;
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

.breadcrumb-item-custom:last-child::after {
    border-left-color: #6c7a89;
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
