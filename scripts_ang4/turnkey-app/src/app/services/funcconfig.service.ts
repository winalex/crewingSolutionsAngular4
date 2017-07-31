import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as models from '../models/models';

import * as helpers from '../ws/winx/helpers';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class FuncConfigService {

  constructor(private __http: Http) {

  }
  // Observable<models.FuncConfigVO>
  get(): Observable<models.FuncConfigVO> {

    // Observable.From
    return this.__http.get('http://localhost:5000/api/config').map(v => v.json())
      .map(json => helpers.ModelFactory.toJSVO(helpers.Helpers.toType(json.$type, models), json, models));
  }

  getTime(): Observable<Date> {
    return this.__http.get('http://localhost:5000/api/config/TIME').map(v => v.json())
      .map(data => new Date(data.replace('\"', '').replace('\"', '')));
  }

  getOptions(): models.OptionsVO[] {

    // TODO take from Web.config
    return  [
        new models.OptionsVO( 'OPTION1' ),
        new models.OptionsVO( 'OPTION2' ),
        new models.OptionsVO( 'OPTION3' ),
        new models.OptionsVO( 'RESERVE' )
    ];
  }



}
