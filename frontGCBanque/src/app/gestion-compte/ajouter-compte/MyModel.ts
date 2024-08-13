this.partLcl = bien.partLCL;
    this.watchPropertyChanges(bien, 'partLCL', (newValue) => this.partLcl = newValue);

// Méthode pour surveiller les changements de propriété
private watchPropertyChanges(obj: any, prop: string, callback: (newValue: any) => void): void {
    let value = obj[prop];
    Object.defineProperty(obj, prop, {
        get: () => value,
        set: (newValue) => {
            if (value !== newValue) {
                value = newValue;
                callback(newValue);
                this.triggerChangeDetection(); // Pour s'assurer que Angular détecte les changements
            }
        },
        enumerable: true,
        configurable: true,
    });
}

// Méthode pour forcer la détection de changement dans Angular
private triggerChangeDetection(): void {
    setTimeout(() => {
        this.cdr.detectChanges();
    }, 0);
}
