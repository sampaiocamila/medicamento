import { Observable, of, throwError, zip } from 'rxjs';
import { catchError, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Country } from '../models';
import {
  Endereco, GeocodingEndereco, GeolocationEndereco, GeolocationModel
} from '../models/geolocation.model';

/**
 * https://github.com/hengkiardo/restcountries
 */
@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient) { }

  // private GEOLOCOTION = btoa('geolocotion');

  // /**
  //  * ### Países REST
  //  * Obtenha informações sobre os países através de uma API RESTful https://restcountries.eu
  //  * - País => TB_TERMO , ISO 3166
  //  * - Idioma => TB_TERMO , ISO 639
  //  * - DDI => TB_DDI , União Internacional de Telecomunicações
  //  */
  // public paises = {

  //     /**
  //      * ### ALL
  //      * Obtenha todos os países
  //      * https://restcountries.eu/#api-endpoints-all
  //      * - País => TB_TERMO , ISO 3166
  //      */
  //     // all: () => this.http.get<Country[]>(`${environment.restcountries}/rest/v2/all`)
  //     all: () => this.http.get<Country[]>(`${environment.all_countries_mock}`)
  //         .pipe(catchError(err => {
  //             return throwError(`Ocorreu um erro ao consultar todos os países`);
  //         })),

  //     /**
  //     * ### By CODE
  //     * Pesquise por nome do país. Pode ser o nome nativo ou nome parcial
  //     * https : // restcountries.eu/rest/v2/name/{name}
  //     * - País => TB_TERMO , ISO 3166
  //     */
  //     byName: (_name) => this.http.get<Country[]>(`${environment.restcountries}/rest/v2/name/${_name}`)
  //         .pipe(catchError(err => {
  //             return throwError(`Ocorreu um erro ao consultar o nome do país: ${_name}`);
  //         })),

  //     /**
  //     * ### By CODE
  //     * Pesquise por codigo do país. Pode ser ISO 3166-1 2-letter or 3-letter
  //     * https://restcountries.eu/rest/v2/alpha/BR

  //     */
  //     byCode: (_code) => this.http.get<Country>(`${environment.restcountries}/rest/v2/alpha/${_code}`)
  //         .pipe(catchError(err => {
  //             return throwError(`Ocorreu um erro ao consultar o codigo do país: ${_code}`);
  //         })),

  //     /**
  //     * ### By full Name
  //     * Pesquisar por nome completo do país
  //     * https : // restcountries.eu/rest/v2/name/{name}?fullText=true
  //     * - País => TB_TERMO , ISO 3166
  //     */
  //     byFullName: (_name) =>
  //         this.http.get<Country>(`${environment.restcountries}/rest/v2/name/${_name}?fullText=true`).pipe(map(ps => ps[0]))
  //             .pipe(catchError(err => {
  //                 return throwError(`Ocorreu um erro ao consultar o nome do país: ${_name}`);
  //             })),

  //     /**
  //      * ### Código de chamada ou DDI
  //      * Pesquisar por código de chamada
  //      * https://restcountries.eu/rest/v2/callingcode/{callingcode}
  //      * - DDI => TB_DDI , União Internacional de Telecomunicações
  //      */
  //     byCallingcode: (_code) =>
  //         this.http.get<Country[]>(`${environment.restcountries}/rest/v2/callingcode/${_code}`)
  //             .pipe(catchError(err => {
  //                 return throwError(`Ocorreu um erro ao consultar o callingCode: ${_code}`);
  //             })),

  //     /**
  //      * ### FILTER RESPONSE - all callingCodes e flags
  //      * Obtenha callingCodes, flag e name de todos os países
  //      * https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}
  //      * https://restcountries.eu/rest/v2/all?fields=name;flag;callingCodes
  //      * - DDI => TB_DDI , União Internacional de Telecomunicações
  //      */
  //     allCallingCode: () => this.http.get<Country[]>(`${environment.all_calling_code_mock}`)
  //         .pipe(catchError(err => {
  //             return throwError(`Ocorreu um erro ao consultar os callingCodes`);
  //         })),

  //     /**
  //      * ### FILTER RESPONSE - idiomas
  //      * Obtenha languages, flag e name de todos os países
  //      * https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}
  //      * https://restcountries.eu/rest/v2/all?fields=name;flag;languages
  //      * - Idioma => TB_TERMO , ISO 639
  //      */
  //     allLanguages: () => of(`${environment.all_languages_mock}`)
  //         .pipe(
  //             switchMap(_URL => this.http.get<Country[]>(_URL)),
  //             catchError(err => {
  //                 return throwError(`Ocorreu um erro ao consultar todas as linguas`);
  //             })),

  //     byLanguage: (iso639: string, _code?) =>
  //         of(`${environment.restcountries}/rest/v2/lang/${iso639}?fields=name;flag;languages;alpha3Code`)
  //             .pipe(
  //                 takeWhile(() => !(iso639 == null || iso639 === 'null')),
  //                 switchMap(_URL => this.http.get(_URL)),
  //                 map((_p_s: Country[]) => {
  //                     let _r = _p_s;
  //                     if (_code) {
  //                         _r = _p_s.filter((_p) => _p.alpha3Code === _code);
  //                     }
  //                     return _r;
  //                 }),
  //                 catchError(err => {
  //                     return throwError(`Ocorreu um erro ao consultar as languages`);
  //                 })
  //             ),

  //     byLanguages: (languages: { alpha3Code: string, iso639_2: string }[]) => {
  //         let list_country = of([]);

  //         if (languages.length < 1) {
  //             return list_country;
  //         }

  //         languages.forEach((_language) => {
  //             list_country = list_country.pipe(
  //                 switchMap(cs => {
  //                     return zip(of(cs), this.paises.byLanguage(_language.iso639_2, _language.alpha3Code));
  //                 }),
  //                 map((_c) => {
  //                     const _countrys: Country[] = [];
  //                     _c.forEach(c => c.forEach(p => _countrys.push(p)));
  //                     return _countrys;
  //                 })
  //             );
  //         });

  //         return list_country;
  //     },

  // };

  // public geolocationModel = {
  //     /**
  //      * input: Decimaldegrees
  //      * output: geolocationModel
  //      */
  //     byDecimaldegrees: (_position: string): Observable<GeolocationModel> => {
  //         if (!_position) { return; }
  //         const length = _position.length;
  //         const _v = _position.search(',');
  //         const _latitude = _position.substring(0, _v).trim();
  //         const _longitude = _position.substring(_v + 1, length).trim();
  //         const _coords = {
  //             latitude: _latitude, longitude: _longitude,
  //             accuracy: null,
  //             altitude: null,
  //             altitudeAccuracy: null,
  //             heading: null,
  //             speed: null
  //         };
  //         return of({ coords: _coords, timestamp: null });
  //     },

  //     /**
  //     * input: geolocationModel
  //     * output: Decimaldegrees
  //     */
  //     toDecimaldegrees: (_position: GeolocationModel): Observable<string> => {
  //         if (!_position) { return; }
  //         const latitude = _position.coords.latitude;
  //         const longitude = _position.coords.longitude;
  //         return of(`${latitude}, ${longitude}`);
  //     }
  // };

  // public geolocationEndereco = {
  //     /**
  //     * input: GeolocationEndereco
  //     * output: Decimaldegrees
  //     */
  //     toDecimaldegrees: (_geoEndereco: GeolocationEndereco): Observable<string> => {
  //         if (!_geoEndereco) { return; }
  //         const latitude = _geoEndereco.latitude;
  //         const longitude = _geoEndereco.longitude;
  //         return of(`${latitude}, ${longitude}`);
  //     },

  //     /**
  //    * https://developer.mapquest.com/documentation/geocoding-api/
  //    *Consulta pela Latitude e Longitude mais próxima
  //    * @return Observable<GeocodingEndereco>
  //    */
  //     byPosition: (_position: GeolocationModel): Observable<GeocodingEndereco> => {
  //         if (!_position) { return; }
  //         const _latitude = _position.coords.latitude;
  //         const _longitude = _position.coords.longitude;
  //         const _key = 'key=Goc9KF46maCGoBsnHofwwJik3qmWB8WS';
  //         const _map = 'ThumbMaps=true&includeRoadMetadata=false&includeNearestIntersection=true';
  //         const _URL = `${environment.openmapquestapi}/geocoding/v1/reverse?${_key}&location=${_latitude},${_longitude}&${_map}`;
  //         return this.http.get<GeocodingEndereco>(_URL);
  //     }
  // };

  // public geocodingEndereco = {
  //     /**
  //     * input: GeocodingEndereco
  //     * output: Decimaldegrees
  //     */
  //     toDecimaldegrees: (_geocodingE: GeocodingEndereco): Observable<string> => {
  //         if (!_geocodingE) { return; }
  //         const latitude = _geocodingE.results[0].locations[0].latLng.lat;
  //         const longitude = _geocodingE.results[0].locations[0].latLng.lng;
  //         return of(`${latitude}, ${longitude}`);
  //     },

  //     /**
  //      * https://developer.mapquest.com/documentation/geocoding-api/
  //      *Consulta pelo CEP
  //      * @return Observable<GeocodingEndereco>
  //      */
  //     byCEP: (cep): Observable<GeocodingEndereco> => {
  //         const _key = 'key=Goc9KF46maCGoBsnHofwwJik3qmWB8WS';
  //         const _map = 'ThumbMaps=true&includeRoadMetadata=false&includeNearestIntersection=true';
  //         const _request = `${environment.mapquestapi}/geocoding/v1/address?${_key}&location=`;
  //         return this.getEnderecoByCep(cep).pipe(
  //             map(_cep => `${_cep.logradouro},${_cep.localidade}, ${_cep.uf}`),
  //             map(_street => `${_request} ${_street}&${_map}`),
  //             switchMap(_URL => this.http.get<GeocodingEndereco>(_URL)),
  //             catchError(err => {
  //                 return throwError(`Ocorreu um erro ao consultar o cep :${cep}`);
  //             })
  //         );
  //     }
  // };

  // public position(): GeolocationModel {
  //     try {
  //         const _value = localStorage.getItem(this.GEOLOCOTION);
  //         if (_value) {
  //             const a = atob(_value);
  //             const res = JSON.parse(a);
  //             return res;
  //         }
  //     } catch (exception) {
  //     }
  //     return;
  //     // tslint:disable-next-line:semicolon
  // }

  // /**
  // * https://viacep.com.br/
  // *
  // * @return Observable<Endereco>
  // */
  // public getEnderecoByCep(cep): Observable<Endereco> {
  //     const _cep = cep.replace(/\D/g, '').slice(0, 8);
  //     return this.http.get<Endereco>(`${environment.viacep}/ws/${_cep}/json/`)
  //         .pipe(catchError(err => {
  //             return throwError(`Ocorreu um erro ao consultar o cep :${cep}`);
  //         }));
  // }

  // public getLocation(): Observable<GeolocationModel> {

  //     if (this.position()) {
  //         return of(this.position());
  //     }

  //     const res: Observable<GeolocationModel> = new Observable(observer => {
  //         if (window.navigator && window.navigator.geolocation) {
  //             window.navigator.geolocation.getCurrentPosition(
  //                 (_position) => {
  //                     observer.next(_position);
  //                     observer.complete();
  //                 },
  //                 (error) => observer.error(error)
  //             );
  //         } else {
  //             observer.error('Unsupported Browser');
  //         }
  //     });

  //     return res.pipe(
  //         tap(p => this.setPosition(this.GEOLOCOTION, p)),
  //         catchError(err => {
  //             return throwError(`Ocorreu erro ao consultar a localização`);
  //         })
  //     );
  // }

  // private setPosition(key: string, p: GeolocationModel) {
  //     const _accuracy = JSON.stringify(p.coords.accuracy == null ? '' : p.coords.accuracy);
  //     const _altitude = JSON.stringify(p.coords.altitude == null ? '' : p.coords.altitude);
  //     const _altitudeAccuracy = JSON.stringify(p.coords.altitudeAccuracy == null ? '' : p.coords.altitudeAccuracy);
  //     const _heading = JSON.stringify(p.coords.heading == null ? '' : p.coords.heading);
  //     const _latitude = JSON.stringify(p.coords.latitude == null ? '' : p.coords.latitude);
  //     const _longitude = JSON.stringify(p.coords.longitude == null ? '' : p.coords.longitude);
  //     const _speed = JSON.stringify(p.coords.speed == null ? '' : p.coords.speed);
  //     const _timestamp = JSON.stringify(p.timestamp == null ? '' : p.timestamp);
  //     const _value = JSON.stringify({
  //         coords:
  //         {
  //             accuracy: _accuracy,
  //             altitude: _altitude,
  //             altitudeAccuracy: _altitudeAccuracy,
  //             heading: _heading,
  //             latitude: _latitude,
  //             longitude: _longitude,
  //             speed: _speed
  //         },
  //         timestamp: _timestamp
  //     });
  //     const _item = btoa(_value);
  //     localStorage.setItem(key, _item);
  // }
}
