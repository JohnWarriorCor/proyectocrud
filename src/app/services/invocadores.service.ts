import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { Invocador } from '../interfaces/invocador.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvocadoresService {

  private campeones: Campeon[] = [
    {
      idx : 0,
      nombre: 'Garen',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quasi atque earum eos quisquam. Aliquid, numquam facilis! Rem, maxime. Officia id, pariatur inventore illo ad ipsum doloribus suscipit placeat labore!',
      img: 'assets/img/aquaman.png',
      aparicion: '2009-10-04',
      casa: 'Marvel'
    },
    {
      idx : 1,
      nombre: 'Ashe',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quasi atque earum eos quisquam. Aliquid, numquam facilis! Rem, maxime. Officia id, pariatur inventore illo ad ipsum doloribus suscipit placeat labore!',
      img: 'assets/img/batman.png',
      aparicion: '1939-05-01',
      casa: 'DC'
    },
    {
      idx : 2,
      nombre: 'Teemo',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quasi atque earum eos quisquam. Aliquid, numquam facilis! Rem, maxime. Officia id, pariatur inventore illo ad ipsum doloribus suscipit placeat labore!',
      img: 'assets/img/daredevil.png',
      aparicion: '1964-01-01',
      casa: 'Marvel'
    },
    {
      idx : 3,
      nombre: 'Lux',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quasi atque earum eos quisquam. Aliquid, numquam facilis! Rem, maxime. Officia id, pariatur inventore illo ad ipsum doloribus suscipit placeat labore!',
      img: 'assets/img/hulk.png',
      aparicion: '1962-05-01',
      casa: 'Marvel'
    },
    {
      idx : 4,
      nombre: 'Ahri',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quasi atque earum eos quisquam. Aliquid, numquam facilis! Rem, maxime. Officia id, pariatur inventore illo ad ipsum doloribus suscipit placeat labore!',
      img: 'assets/img/linterna-verde.png',
      aparicion: '1940-06-01',
      casa: 'DC'
    },
    {
      idx : 5,
      nombre: 'Zed',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quasi atque earum eos quisquam. Aliquid, numquam facilis! Rem, maxime. Officia id, pariatur inventore illo ad ipsum doloribus suscipit placeat labore!',
      img: 'assets/img/spiderman.png',
      aparicion: '1962-08-01',
      casa: 'Marvel'
    },
    {
      idx : 6,
      nombre: 'Miss Fortune',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quasi atque earum eos quisquam. Aliquid, numquam facilis! Rem, maxime. Officia id, pariatur inventore illo ad ipsum doloribus suscipit placeat labore!',
      img: 'assets/img/miss.png',
      aparicion: '1974-11-01',
      casa: 'Marvel'
    },
    {
      idx : 7,
      nombre: 'Braum',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quasi atque earum eos quisquam. Aliquid, numquam facilis! Rem, maxime. Officia id, pariatur inventore illo ad ipsum doloribus suscipit placeat labore!',
      img: 'assets/img/wolverine.png',
      aparicion: '1974-11-01',
      casa: 'Marvel'
    },
    {
      idx : 8,
      nombre: 'Kai Sa',
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quasi atque earum eos quisquam. Aliquid, numquam facilis! Rem, maxime. Officia id, pariatur inventore illo ad ipsum doloribus suscipit placeat labore!',
      img: 'assets/img/kaisa.png',
      aparicion: '1974-11-01',
      casa: 'Marvel'
    }
  ];

  invocadoresURL = 'https://invocadoreslol-1c8df.firebaseio.com/invocadores.json';
  invocadorURL = 'https://invocadoreslol-1c8df.firebaseio.com/invocadores/';

  constructor( private http: Http) { }

  nuevoInvocador( invocador: Invocador) {
    const body = JSON.stringify(invocador);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post( this.invocadoresURL, body, {headers} ).pipe(map(res => {
      console.log(res.json());
      return res.json();
    }));
  }
  actualizarInvocador( invocador: Invocador, key$: string ) {
    const body = JSON.stringify(invocador);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.invocadorURL}/${key$}.json`;

    return this.http.put( url, body, {headers} ).pipe(map( res => {
      console.log(res.json());
      return res.json();
    }));

  }
  getInvocador(key$: string) {
    const url = `${ this.invocadorURL }/${ key$ }.json`;
    return this.http.get( url ).pipe(map(res => res.json()));
  }
  getInvocadores() {
    return this.http.get( this.invocadoresURL ).pipe(map(res => res.json()));
  }
  borrarInvocador( key$: string) {
    const url = `${ this.invocadorURL }/${ key$ }.json`;
    return this.http.delete(url).pipe(map( res => res.json()));
  }
  getCampeones(): Campeon[] {
    return this.campeones;
  }

  getCampeon( idx: string ) {
    return this.campeones[idx];
  }

  buscarHeroes( termino: string ): Campeon[] {

    const campeonesArr: Campeon[] = [];
    termino = termino.toLowerCase();

    for ( let i = 0; i < this.campeones.length; i ++ ) {

      const campeon = this.campeones[i];

      const nombre = campeon.nombre.toLowerCase();

      if ( nombre.indexOf( termino ) >= 0  ) {
        campeon.idx = i;
        campeonesArr.push( campeon );
      }

    }

    return campeonesArr;

  }
}


export interface Campeon {
  idx?: number;
  nombre: string;
  bio: string;
  img: string;
  aparicion: string;
  casa: string;
}
