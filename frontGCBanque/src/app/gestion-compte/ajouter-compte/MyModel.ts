.breadcrumb {
  display: flex;
  flex-wrap: wrap;
}

.breadcrumb-item {
  position: relative;
  padding: 10px;
  margin-right: 10px;
}

.breadcrumb-item a {
  position: relative;
  display: block;
  padding: 10px;
  background: #007bff;
  color: white;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  clip-path: polygon(50% 0%, 100% 25%, 75% 100%, 25% 100%, 0% 25%);
}

.breadcrumb-item a:hover {
  background: #0056b3;
}

.breadcrumb-item a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #007bff;
}

.breadcrumb-item a:hover::before {
  border-right-color: #0056b3;
}
