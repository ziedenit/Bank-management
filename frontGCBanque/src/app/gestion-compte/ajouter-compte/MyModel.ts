import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  constructor() { }

  generateId(objet: string): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let idfdBuilder = '';
    const secureRandom = new Uint8Array(8);

    window.crypto.getRandomValues(secureRandom);

    for (let i = 0; i < 8; i++) {
      const randomIndex = secureRandom[i] % characters.length;
      const randomChar = characters.charAt(randomIndex);
      idfdBuilder += randomChar;
    }

    return objet + idfdBuilder.toUpperCase();
  }
}
