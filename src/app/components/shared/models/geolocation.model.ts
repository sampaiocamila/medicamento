export interface GeolocationEndereco {
    altitude: any;
    cep: any;
    latitude: any;
    longitude: any;
    logradouro: string;
    bairro: any;
    cidade: GeolocationCidade;
    estado: GeolocationEstado;
}

export interface GeolocationCidade {
    ddd: any;
    ibge: any;
    nome: string;
}

export interface GeolocationEstado {
    sigla: string;
}

export interface GeolocationModel {
    coords: GeolocationCoords;
    timestamp: any;
}
export interface GeolocationCoords {
    accuracy: any;
    altitude: any;
    altitudeAccuracy: any;
    heading: any;
    latitude: any;
    longitude: any;
    speed: any;
}

export interface Endereco {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
}

export interface GeocodingEndereco {
    info: GeocodingInfo;
    options: GeocodingOptions;
    results: GeocodingProvidedLocation[];
}


export interface GeocodingInfo {
    statuscode: any;
    copyright: GeocodingCopyright;
    messages: [];
}

export interface GeocodingCopyright {
    text: any;
    imageUrl: any;
}

export interface GeocodingOptions {
    maxResults: any;
    thumbMaps: any;
    ignoreLatLngInput: any;
}

export interface GeocodingProvidedLocation {
    providedLocation: any;
    locations: GeocodingLocation[];
}

export interface GeocodingLocation {
    street: string;
    adminArea6: string;
    adminArea6Type: string;
    adminArea5: string;
    adminArea5Type: string;
    adminArea4: string;
    adminArea4Type: string;
    adminArea3: string;
    adminArea3Type: string;
    adminArea1: string;
    adminArea1Type: string;
    postalCode: any;
    geocodeQualityCode: string;
    geocodeQuality: string;
    dragPoint: any;
    sideOfStreet: string;
    linkId: any;
    unknownInput: any;
    type: string;
    latLng: { lat: any, lng: any };
    displayLatLng: { lat: any, lng: any };
    mapUrl: string;
    nearestIntersection: any;
}

export interface Country {
    name: string;
    topLevelDomain: string[];
    alpha2Code: string;
    alpha3Code: string;
    callingCodes: string[];
    capital: string;
    altSpellings: string[];
    region: string;
    subregion: string;
    population: string;
    latlng: string[];
    demonym: string;
    area: string;
    gini: string;
    timezones: string[];
    borders: string[];
    nativeName: string;
    numericCode: string;
    currencies: Currencie[];
    languages: Language[];
    translations: Translations;
    flag: string;
    regionalBlocs: any[];
    cioc: string;
}

export interface Currencie {
    code: string;
    name: string;
    symbol: string;
}

export interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
}

export interface Translations {
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
}

