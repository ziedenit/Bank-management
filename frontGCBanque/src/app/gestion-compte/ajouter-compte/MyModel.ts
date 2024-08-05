  generateIdObjetFinancement(): Observable<string> {
    return this.http.get(`${this.baseUrl}/generate_idObjetFinancement`, { 
      headers: this.getHeaders() ,
      responseType: 'text'
    })
      .pipe(
        tap(data => console.log('ID Objet Financement généré :', data)),
        catchError(error => {
          console.error('Erreur lors de la génération d\'ID Objet Financement :', error);
          return this.handleError(error);
        })
      );
  }
nouvelObjet.idObjetFinancement=this.idGeneratorService.generateIdObjetFinancement();
Type 'Observable<string>' is not assignable to type 'string'.ts(2322)
(property) ObjetFinancement.idObjetFinancement: string
