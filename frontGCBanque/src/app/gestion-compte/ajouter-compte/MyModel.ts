.breadcrumb-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
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
  padding: 15px 25px;
  position: relative;
  margin-right: 10px;
  clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);
  transition: box-shadow 0.3s ease, font-weight 0.3s ease, color 0.3s ease;
}

.breadcrumb-item-custom a {
  color: rgb(1, 0, 14);
  text-decoration: none;
  font-weight: normal;
  padding-left: 10px; /* Décaler un peu le texte vers la gauche */
}

.breadcrumb-item-custom a:hover {
  text-decoration: underline;
  font-weight: bold;
  color: darkblue;
}

.breadcrumb-item-custom:last-child {
  background-color: #acccee;
}

.breadcrumb-item-custom::after {
  content: "";
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 10px solid #2c3e50;
  position: absolute;
  right: -30px;
  top: 0;
}

.breadcrumb-item-custom:last-child::after {
  border-left-color: transparent;
}

.breadcrumb-item-custom:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.breadcrumb-item-custom .close-btn {
  position: absolute;
  top: 3px;
  right: 15px;
  background: none;
  color: red; 
  border: none;
  font-size: 16px; 
  cursor: pointer;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px; /* Ajouter une marge à gauche pour espacer le "x" */
}

.button-container {
  margin-left: auto;
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
