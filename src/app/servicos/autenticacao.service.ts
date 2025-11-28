import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Usuario } from '../tipos/tipos';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private readonly API_URL = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  obterUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL);
  }

  salvarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API_URL, usuario);
  }

  validarLogin(email: string, senha: string): Observable<Usuario | null> {
    return this.obterUsuarios().pipe(
      map((usuarios) => {
        const usuario = usuarios.find(
          (u) => u.email === email && u.senha === senha
        );
        return usuario || null;
      }),
      catchError(() => of(null))
    );
  }
}
