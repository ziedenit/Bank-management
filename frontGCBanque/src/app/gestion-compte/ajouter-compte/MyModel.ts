 if (element) {
            if (condition) {
                this.champObligatoire = true;
                this.donneeObligatoire = 'Donnée obligatoire';
                element.classList.add('field-error');
            } else {
                element.classList.remove('field-error');
            }
        }
