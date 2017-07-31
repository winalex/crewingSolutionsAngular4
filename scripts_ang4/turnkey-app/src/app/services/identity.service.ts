import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as models from '../models/models';

import * as helpers from '../ws/winx/helpers';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class IdentityService {

  constructor(private __http: Http) { }

  // this.get=function(successHandler,errorHandler){
  //       $http.get(BASE_URL+'api/identity').success(successHandler).error(errorHandler);
  //   }
  get(): Observable<models.IdentityVO> {
    return this.__http.get('http://localhost:5000/api/identity').map(v => v.json())
      .map(json => helpers.ModelFactory.toJSVO(helpers.Helpers.toType(json.$type, models), json, models));
  }


}
