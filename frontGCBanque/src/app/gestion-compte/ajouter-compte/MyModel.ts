.breadcrumb {
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
}

.breadcrumb-item {
  padding: 10px 20px;
  color: white;
  background-color: grey;
  position: relative;
  clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);
  margin-right: 10px;
  transition: box-shadow 0.3s ease; /* Ajout de transition pour un effet lisse */
}

.breadcrumb-item.active {
  background-color: #fbbd08;
}

.breadcrumb-item::before {
  content: '';
  position: absolute;
  top: 0;
  right: -10px;
  width: 10px;
  height: 100%;
  background-color: inherit;
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}

.breadcrumb-item:last-child {
  margin-right: 0;
}

.breadcrumb-item:last-child::before {
  display: none;
}

.breadcrumb-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Ombre lors du survol */
}
