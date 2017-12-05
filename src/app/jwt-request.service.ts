import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';

import { AuthService } from './auth.service';
import { BloquearPantallaService } from './bloquear-pantalla/bloquear-pantalla.service';

import { environment } from '../environments/environment';

@Injectable()

export class JwtRequestService {

  constructor(private http: Http, private authService: AuthService, private bloquearPantallaService: BloquearPantallaService, private router: Router, private jwtHelper: JwtHelper) {
    var token = localStorage.getItem('token');

    if (token == 'undefined') {
      this.authService.logout();
    }
  }

  get(url: string, id: any = null, params: any = null): Observable<any> {

    var data = this.request('get', url, id, params);
    if (id != null) {
      return data as Observable<any>;
    } else {
      return data as Observable<any[]>;
    }
  }

  post(url: string, params: any = null): Observable<any> {
    var data = this.request('post', url, null, params);
    return data as Observable<any>;
  }

  put(url: string, id: any = null, params: any = null): Observable<any> {
    var data = this.request('put', url, id, params);
    return data as Observable<any>;
  }

  delete(url: string, id: any = null, params: any = null): Observable<any> {
    var data = this.request('delete', url, id);
    return data as Observable<any>;
  }

  private request(method: string, url: string, id: any = null, params: any = {}): Observable<any> {

    var usuario = JSON.parse(localStorage.getItem("usuario"));
    var sucursal = localStorage.getItem("sucursal");
    var clues = localStorage.getItem("clues") ? JSON.parse(localStorage.getItem("clues")) : {clues: "", nombre: ""};
    var caja = JSON.parse(localStorage.getItem("caja"));
    
    var url_abs = '';
    var headersJson = {};
    if (url.indexOf("http") > -1) {
       headersJson = {
         'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
      };
      url_abs = `${url}`;
    } else {
       headersJson = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Disponible': environment.OAUTH_DISPONIBLE,
        'X-Usuario': usuario.email,
        'sucursal': sucursal,
        'clues': clues.clues,
        'caja': caja
      };
      url_abs = `${environment.API_URL}/${url}`;
    }
    if (localStorage.getItem('token') == null) {
      return null;
    }

    var serverInfo = JSON.parse(localStorage.getItem("server_info"));
    var token = '';
    if (localStorage.getItem('token') == 'undefined') {
      this.bloquearPantallaService.bloquearPantalla();
    }

    token = this.jwtHelper.decodeToken(localStorage.getItem('token'));    

    var headers = new Headers(headersJson);

    var data = new Observable(observer => {

      if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
        var ttl: number = Number(serverInfo.token_refresh_ttl);
        ttl = Number.isNaN(ttl) ? 0 : ttl;

        var expiracionToken = this.jwtHelper.getTokenExpirationDate(localStorage.getItem('token'))
        var expiracionRefreshToken = new Date(expiracionToken.getTime() + (ttl * 60000));
        var clienteDate = new Date();

        if (expiracionRefreshToken.getTime() - clienteDate.getTime() <= 0) {
          this.bloquearPantallaService.bloquearPantalla();//this.authService.logout(this.router.url);
        } else {
          // Refrescamos token
          this.authService.refreshToken().subscribe(
            () => {
              headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Disponible': environment.OAUTH_DISPONIBLE });

              if (method == 'get') {
                let urlSearchParams = new URLSearchParams()
                if (params != null) {
                  for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                      urlSearchParams.set(key, params[key]);
                    }

                  }
                }
                if (id == null) {
                  this.http.get(`${url_abs}`, { headers: headers, search: urlSearchParams })
                    .subscribe(
                    data => {
                      observer.next(data)
                    },
                    error => { observer.error(error) }
                    );
                } else {
                  this.http.get(`${url_abs}/${id}`, { headers: headers, search: urlSearchParams })
                    .subscribe(
                    data => {
                      observer.next(data)
                    },
                    error => { observer.error(error) }
                    );
                }
              }

              if (method == 'post') {
                this.http.post(`${url_abs}`, params, { headers: headers })
                  .subscribe(
                  data => {
                    observer.next(data)
                  },
                  error => { observer.error(error) }
                  );
              }

              if (method == 'put' && id != null) {
                this.http.put(`${url_abs}/${id}`, params, { headers: headers })
                  .subscribe(
                  data => {
                    observer.next(data)
                  },
                  error => { observer.error(error) }
                  );
              }

              if (method == 'delete' && id != null) {
                this.http.delete(`${url_abs}/${id}`, { headers: headers })
                  .subscribe(
                  data => {
                    observer.next(data)
                  },
                  error => { observer.error(error) }
                  );
              }

            }, error => {
              console.log("Token caducado. Se intento renovar pero el servidor no lo permitió, debido a que se superó el tiempo límite.");
              console.log("Bloqueando aplicación.");

              this.bloquearPantallaService.bloquearPantalla();
            }
          );
        }

      } else {
        if (method == 'get') {
          let urlSearchParams = new URLSearchParams()
          if (params != null) {
            for (var key in params) {
              if (params.hasOwnProperty(key)) {
                urlSearchParams.set(key, params[key]);
              }

            }
          }
          if (id == null) {
            this.http.get(`${url_abs}`, { headers: headers, search: urlSearchParams })
              .subscribe(
              data => {
                observer.next(data)
              },
              error => { observer.error(error) }
              );
          } else {
            this.http.get(`${url_abs}/${id}`, { headers: headers, search: urlSearchParams })
              .subscribe(
              data => {
                observer.next(data)
              },
              error => { observer.error(error) }
              );
          }
        }


        if (method == 'post') {
          this.http.post(`${url_abs}`, params, { headers: headers })
            .subscribe(
            data => {
              observer.next(data)
            },
            error => { observer.error(error) }
            );
        }

        if (method == 'put' && id != null) {
          this.http.put(`${url_abs}/${id}`, params, { headers: headers })
            .subscribe(
            data => {
              observer.next(data)
            },
            error => { observer.error(error) }
            );
        }

        if (method == 'delete' && id != null) {
          this.http.delete(`${url_abs}/${id}`, { headers: headers })
            .subscribe(
            data => {
              observer.next(data)
            },
            error => { observer.error(error) }
            );
        }
      }
    });
    return data;
  }
}