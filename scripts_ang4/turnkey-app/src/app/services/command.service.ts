import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Command } from '../command.enum';

import * as models from '../models/models';

import * as helpers from '../ws/winx/helpers';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class CommandService {

  constructor(private __http: Http) { }



  //  //SAVE BID
  //       this.SaveBid = function (seniorityNumber, bid, cmd, isActive, offdays, options, criteria, dataSetID,
  //   DEBUG, successHandler, errorHandler) {
  //           $http.get(BASE_URL + 'api/command/' + seniorityNumber + '/' + bid + '/' + cmd + '/' + isActive + '/'
  // + offdays + '/' + options + '/' + criteria + '/' + dataSetID + '/' + DEBUG).success(successHandler).error(errorHandler);
  //       };
  SaveBid(seniorityNumber, bid, cmd: Command, isActive, offdays, options, criteria, dataSetID, DEBUG) {
    return this.__http.get('http://localhost:5000/api/command/' + seniorityNumber + '/' + bid + '/' + cmd + '/' + isActive +
      '/' + offdays + '/' + options + '/' + criteria + '/' + dataSetID + '/' + DEBUG).map(v => v.json())
      .map(json => helpers.ModelFactory.toJSVO(helpers.Helpers.toType(json.$type, models), json, models));

  }



  //       //GET USER DETAILS
  //       this.getUserDetails = function (seniorityNumber, bid, cmd, dataSetID, DEBUG, successHandler, errorHandler) {
  //           $http.get(BASE_URL + 'api/command/' + seniorityNumber + '/' + bid + '/' + cmd + '/'
  // + dataSetID + '/' + DEBUG).success(successHandler).error(errorHandler);
  //       };
  getUserDetails(seniorityNumber, bid: string, cmd: Command, dataSetID: string, DEBUG: number): Observable<models.UserDetailsVO> {
    return this.__http.get('http://localhost:5000/api/command/' + seniorityNumber + '/' + bid + '/' + cmd + '/' + dataSetID + '/' + DEBUG)
      .map(v => v.json())
      .map(json => helpers.ModelFactory.toJSVO(helpers.Helpers.toType(json.$type, models), json, models));
  }


  //       //GET FILE
  //       this.getFile = function (seniorityNumber, bid, cmd, file, dataSetID, DEBUG, successHandler, errorHandler) {
  //           $http.get(BASE_URL + 'api/command/' + seniorityNumber + '/' + bid + '/' + cmd + '/' + file + '/'
  // + dataSetID + '/' + DEBUG).success(successHandler).error(errorHandler);
  //       };
  getFile(seniorityNumber, bid: string, cmd: Command, file: string, dataSetID: string, DEBUG: number): Observable<any> {
    return this.__http.get('http://localhost:5000/api/command/' + seniorityNumber + '/' + bid + '/' + cmd + '/'
      + file + '/' + dataSetID + '/' + DEBUG).map(v => v.json())
      .map(json => {
        if (json.hasOwnProperty('$type')) {
          return helpers.ModelFactory.toJSVO(helpers.Helpers.toType(json.$type, models), json, models);
        } else {
          return json;
        }

      });
}




  //       this.getDiagnostics = function (seniorityNumber, DEBUG, successHandler, errorHandler) {
  //           $http.get(BASE_URL + 'api/command/' + seniorityNumber+'/'+DEBUG).success(successHandler).error(errorHandler);
  //       };
  getDiagnostics(seniorityNumber, DEBUG) {
    return this.__http.get('http://localhost:5000/api/command/' + seniorityNumber + '/' + DEBUG).map(v => v.json())
      .map(json => helpers.ModelFactory.toJSVO(helpers.Helpers.toType(json.$type, models), json, models));

  }




  //       //GET BID
  //       this.getBid = function (seniorityNumber, bid, cmd, dataSetID, DEBUG, successHandler, errorHandler) {
  //           $http.get(BASE_URL + 'api/command/' + seniorityNumber + '/' + bid + '/' + cmd +
  //   '/' + dataSetID + '/' + DEBUG).success(successHandler).error(errorHandler);
  //       };

  getBid(seniorityNumber, bid, cmd: Command, dataSetID, DEBUG): Observable<models.GUIBindingsVO> {
    return this.__http.get('http://localhost:5000/api/command/' + seniorityNumber + '/' + bid + '/' + cmd + '/' + dataSetID + '/' + DEBUG)
      .map(v => v.json())
      .map(json => helpers.ModelFactory.toJSVO(helpers.Helpers.toType(json.$type, models), json, models));

  }

  //       //GET MENU, DESCRIBE, SORT,
  //       this.get = function (seniorityNumber, bid, cmd, offdays, options, criteria, dataSetID, DEBUG, successHandler, errorHandler) {
  //           $http.get(BASE_URL + 'api/command/' + seniorityNumber + '/'
  //    + bid + '/' + cmd + '/' + offdays + '/' + options + '/' + criteria + '/' + dataSetID +
  //  '/' + DEBUG).success(successHandler).error(errorHandler);
  //       };

  get(seniorityNumber, bid, cmd: Command, offdays, options, criteria, dataSetID, DEBUG) {
    return this.__http.get('http://localhost:5000/api/command/' + seniorityNumber + '/' + bid + '/' + cmd + '/' + offdays
      + '/' + options + '/' + criteria + '/' + dataSetID + '/' + DEBUG).map(v => v.json())
      .map(json => helpers.ModelFactory.toJSVO(helpers.Helpers.toType(json.$type, models), json, models));

  }
}
