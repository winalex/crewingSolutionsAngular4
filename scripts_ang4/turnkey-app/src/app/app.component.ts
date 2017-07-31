import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';



import * as helpers from './ws/winx/helpers';
import * as models from './models/models';


import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { ProgressComponent } from './progress/progress.component';
import { OptionsTabComponent } from './options-tab/options-tab.component';

import { FuncConfigService } from './services/funcconfig.service';
import { IdentityService } from './services/identity.service';
import { CommandService } from './services/command.service';

import { Command } from './command.enum';

import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  title = 'app';

  private __loadingDialogRef: MdDialogRef<ProgressComponent>;



  // this.funcConfig = Models.ModelFactory.toJSVO(Helpers.toType(data.$type), data);
  funcConfig: models.FuncConfigVO;
  identity: models.IdentityVO;
  guiVO: models.GUIVO;
  DEBUG = 1;

  // DEBUG
  // this.identity=new IdentityVO();
  // this.identity.seniorityNumber=12;
  // this.identity.dataSetID='XA-EWRCA_ERJA10-GUI';
  // this.identity.details=new UserDetailsVO();
  // this.identity.details.bidOfRecord='1'



  // DEFINITIONS
  reserveDefinitionSelection = [];
  linePreferencesSelections: Array<models.SelectionVO>;
  linePreferencesSelection: string[];
  tripPreferencesSelection = [];

  previousTripPreferencesDescription: string;
  previousTripPreferencesSearch: string[];

  autoAddToBid = false;
  bids = [];
  availableBidTrips = null;
  tripsAddedToBid = [];

  bidsTripsPageSize = 15;
  bidsTripsPageCount: number;
  bidsTripsCurrentPage: number;
  bidTripsPages: number[];
  fromBidTrip: number;
  toBidTrip: number;

  // which bid tab is reserve
  reserveTabInx = 3;
  // how many criteria menus to display at once
  numCriteriaMenus = 3;

  refreshTimeCallInterval = 60000; // 1min

  isBidClosed = false;

  diagnosticText = '';

  // could come in config
  // useWebConfig = true
  // useEmployeeID = true
  // useCalDating = false
  // usePairingForLookups = false
  // convertTripsToPairsInMenuDisplay = false
  // TABDisplay = false
  // allowRemoveTrip = false
  // allowTripToTop = false

  tripImportanceLevels = [1, 2, 3];
  tripDetails: string[];

  searchTabs;

  @ViewChild(OptionsTabComponent) optionsTabs: OptionsTabComponent;

  slides;
  searchModeTabs;

  awardCriteria = true;
  criteriaSelectedInx = -1;
  criteriaDesciption = new models.CriteriaDescriptionVO();
  criteriaSelections: Array<models.CriteriaSelectionVO>;

  bidIsSaved = true;
  bidClosedDate: string;
  bidCurrentDate: string;
  bidStatus: string;
  bidTabDirty;
  bindingData: models.GUIBindingsVO;

  timeLeftToBid: string;

  carryInSpan: number;
  bidTripsSpan: number;

  absences: Array<Array<models.DaysOffRangeVO>>;
  daysOff: Array<Array<models.DaysOffRangeVO>>;

  searchResultsPageSize = 15;
  searchResultsPageCount = 0;
  searchResultsCurrentPage = 1;
  searchResultsPages = [];
  fromSearchResult: number;
  toSearchResult: number;



  constructor(private _loadingDialog: MdDialog, private __funcConfigService: FuncConfigService,
    private __commandService: CommandService, private __identityService: IdentityService) {

    this.tripPreferencesSelection[0] = 2;

  }

  //////////////////////-------------- GET GUI RESOURCESE -----------/////////////////////
  getGUIVO(ident: models.IdentityVO, f: models.FuncConfigVO): Observable<models.GUIVO> {

    return this.__commandService.getFile(ident.getIdentity(), '00',
      Command.ReadFileCommand, f.getGuiResourcesFile(),
      ident.dataSetID, this.DEBUG)
      .do((guiVO: models.GUIVO) => {

        this.guiVO = guiVO;

        debugger; // tslint:disable-line no-debugger

        this.linePreferencesSelections = new Array<models.SelectionVO>();

        const lineOptions = this.guiVO.resources.lineOptions;
        const numLineOptions = lineOptions.length;

        for (let i = 0; i < numLineOptions; i++) {
          this.linePreferencesSelections[i] = new models.SelectionVO();
        }

        this.bidClosedDate = helpers.Helpers.toDateFormat(this.guiVO.resources.bidPeriodCloseDate, 'DD-MM-YY HH:mm');

        this.bidStatus = this.guiVO.config.bidStatuses[0].status;

        this.__loadingDialogRef.componentInstance.title = 'Loading User Details...';

        if (this.funcConfig.useDiagnostics) {
          this.diagnosticText += '\n<b class=\'blue\'>' + '00' + ' ' + Command.LoginCommand + ' ' + this.identity.getIdentity() + '</b>\n';
        }

        console.log(guiVO);

      });
  }


  //////////////////////-------------- GET USER DETAILS -----------/////////////////////

  getUserDetailsObservable(r: models.IdentityVO) {

    return this.__commandService.getUserDetails(r.getIdentity(), '00', Command.LoginCommand,
      r.dataSetID, this.DEBUG).do(userDetails => {


        // this.logon= Models.ModelFactory.createAll(Models.UserDetailsVO,data);

        this.identity.details = userDetails;

        debugger; // tslint:disable-line no-debugger

        console.log(userDetails);

        if (this.funcConfig.useDiagnostics) {
          this.diagnosticText += '\n' + this.identity.details.diagnosticText.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '\n';
        }

        // DEBUG
        // this.identity.details.carryIn.days=0;
        // this.identity.details.carryIn.hours=0;

        if (this.identity.details.carryIn != null) {
          this.carryInSpan = this.identity.details.carryIn.days + (this.identity.details.carryIn.hours > 0 ? 1 : 0);

          // what if this.carryInSpan is 0
          if (this.carryInSpan > 0) {
            this.bidTripsSpan = this.carryInSpan - 1;
          } else {
            this.bidTripsSpan = 0;
          }
        } else {
          console.log(' No carryIn sent');
        }

        ///ABSENCES

        let absences = this.identity.details.daysOff;

        ///normally absences are shown in second(2) row
        ///when there is duplicates they should go in third(3) row
        let i = 0;
        const k = 0;
        const len = absences.length;

        const uniqueAbsences = absences;

        // fiter 'absences' to uniqueAbsences and return duplicates into 'absences'
        absences = helpers.Helpers.removeDuplicates(uniqueAbsences, helpers.Helpers.compare('startInx'));

        // this.absences = [[], [], []];
        this.absences = [new Array<models.DaysOffRangeVO>(), new Array<models.DaysOffRangeVO>(), new Array<models.DaysOffRangeVO>()];

        let abs;
        let firstDuplicate;
        let secondDuplicate;
        let newAbs;
        let index;
        // expand absences to 3 rows of priority (1,2,3)
        for (i = 0; 0 < uniqueAbsences.length; i++) {

          // take Absence
          abs = uniqueAbsences.shift();

          firstDuplicate = null;
          secondDuplicate = null;

          index = helpers.Helpers.objectIndexFindByKey(absences, 'startInx', abs.startInx);

          // if found duplicate =>
          if (index > -1) {
            firstDuplicate = absences[index];
            absences.splice(index, 1); // delete
          }

          index = helpers.Helpers.objectIndexFindByKey(absences, 'startInx', abs.startInx);

          if (index > -1) {
            secondDuplicate = absences[index];
            absences.splice(index, 1); // delete
          }

          while ((index = helpers.Helpers.objectIndexFindByKey(absences, 'startInx', abs.startInx)) > -1) {
            absences.splice(index, 1); // delete
          }

          if (firstDuplicate != null) {
            this.absences[2][i] = firstDuplicate;
          } else {
            newAbs = new models.AbsenceRangeVO();
            newAbs.startInx = abs.startInx;
            newAbs.endInx = abs.endInx;
            newAbs.typeLabel = '';

            this.absences[2][i] = newAbs;
          }

          this.absences[1][i] = abs;

          if (secondDuplicate != null) {
            this.absences[0][i] = secondDuplicate;
          } else {
            newAbs = new models.AbsenceRangeVO();
            newAbs.startInx = abs.startInx;
            newAbs.endInx = abs.endInx;
            newAbs.typeLabel = '';

            this.absences[0][i] = newAbs;
          }

        }

        this.__loadingDialogRef.componentInstance.title = 'Loading Trip Details...';

      });
  }

  //////////////////////-------------- GET TRIP DETAILS -----------/////////////////////

  getTripDetailsObservable(r: models.IdentityVO, f: models.FuncConfigVO): Observable<string[]> {
    // seniorityNumber,bid,cmd,file,dataSetID,successHandler,errorHandler
    return this.__commandService.getFile(r.getIdentity(), '00', Command.ReadFileCommand,
      f.tripDetailsFile, r.dataSetID, this.DEBUG).do(data => {
        this.tripDetails = data;

        console.log(this.tripDetails);

        this.__loadingDialogRef.componentInstance.title = 'Loading Bid...';


        const bid = '0' + (this.optionsTabs.activeTab + 1);
        this.diagnosticText += '\n<b class=\'blue\'>' + bid + ' ' + Command.BidRequestCommand + ' ' + bid + '</b>\n';
        this.autoAddToBid = true;
        this.bidIsSaved = true;

      });
  }


  ngOnInit() {
    console.log('ngOnInit');

    // debugger; // tslint:disable-line no-debugger




    this.__loadingDialogRef = this._loadingDialog.open(ProgressComponent);

    this.__loadingDialogRef.componentInstance.title = 'Loading Func config...';

    const $identity = Observable.of(this.identity);


    //////////////////////-------------- GET FUNC CONFIG -----------/////////////////////
    const $getFuncConfigObservable = this.__funcConfigService.get().do((funcConfig: models.FuncConfigVO) => {
      this.__loadingDialogRef.componentInstance.title = 'Loading Identity...';

      this.funcConfig = funcConfig;
      console.log(funcConfig);
    });

    //////////////////////-------------- GET IDENTITY -----------/////////////////////
    const $getIdentityObservable = this.__identityService.get().do((i: models.IdentityVO) => {
      this.identity = i;

      // this.identity.useEmployeeID = this.funcConfig.useEmployeeID;

      this.__loadingDialogRef.componentInstance.title = 'Loading GUI Resources...';


      console.log(i);

    });



    //  this.identity =this.__identityService.get();











    //////////////////////-------------- GET TIME -----------/////////////////////
    const $getTimeObservable = IntervalObservable.create(this.refreshTimeCallInterval)
      .do(d => this.__funcConfigService.getTime().concat(IntervalObservable.create(this.refreshTimeCallInterval))
        .do((date: Date) => {

          console.log(date);

          const diff = this.guiVO.resources.bidPeriodCloseDate.getMilliseconds() - date.getMilliseconds();

          this.bidCurrentDate = helpers.Helpers.toDateFormat(date, 'DD/MM/YY HH:mm:ss');

          // 86.400.000

          this.timeLeftToBid = helpers.Helpers.toDateFormat(diff, 'd\'d\' HH\'h\' mm\'m\'');

          if (diff < 120000) { // less then 2min=120s=120000ms

            if (diff < 20000) { this.refreshTimeCallInterval = 10000; } // 10s

            // change status to close STATUS=1
            this.isBidClosed = true;
            this.bidStatus = this.guiVO.config.bidStatuses[1].status;


          }
        }
        ));







    //////////////////////-------------- GET BID  -----------/////////////////////
    // const $getBid = this.__commandService.getBid(this.identity.getIdentity(), '0' + (this.optionsTabs.activeTab + 1),
    // const $getBid = this.__commandService.getBid(() => this.identity.getIdentity(), '0' + (this.optionsTabs.activeTab + 1),
    //   Command.BidRequestCommand,
    //   this.identity.dataSetID, this.DEBUG).do(data => {

    //     this.bindingData = data;

    //     let i = 0;

    //     // show response in diagnostics tab
    //     if (this.funcConfig.useDiagnostics) {
    //       this.diagnosticText += '\n' + this.bindingData.diagnosticText.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '\n';
    //     }

    //     if (this.optionsTabs.activeTab !== this.reserveTabInx) { // not reserve
    //       this.criteriaSelections = [];

    //       // set SELECT linePreferences Tab
    //       this.linePreferencesSelection = this.bindingData.currentLinePreferences;

    //       if (this.linePreferencesSelection === undefined) {
    //         this.linePreferencesSelection = new Array<string>();
    //       }

    //       const lineOptions = this.guiVO.resources.lineOptions;
    //       const numLineOptions = lineOptions.length;
    //       const numLinePreferences = this.linePreferencesSelection.length;
    //       let opCode;
    //       for (i = 1; i < numLineOptions; i++) {
    //         for (let j = 0; j < numLinePreferences; j++) {
    //           opCode = this.linePreferencesSelection[j];

    //           if (helpers.Helpers.objectIndexFindByKey(lineOptions[i], 'opCode', opCode) > -1) {
    //             this.linePreferencesSelections[i].prevSelected = this.linePreferencesSelections[i].selected = opCode;
    //           }
    //         }
    //       }

    //       // TODO do custom repeat directive
    //       if (this.slides === undefined) {
    //         this.slides = [];
    //       }


    //       for (i = 0; i < this.numCriteriaMenus; i++) {
    //         this.criteriaSelections[i * this.numCriteriaMenus] = new models.CriteriaSelectionVO();
    //         this.criteriaSelections[i * this.numCriteriaMenus + 1] = new models.CriteriaSelectionVO();
    //         this.criteriaSelections[i * this.numCriteriaMenus + 2] = new models.CriteriaSelectionVO();
    //         if (this.slides[i] === undefined) {
    //           this.slides[i] = {};
    //         }
    //       }
    //     }

    //     // Show popup messages
    //     for (i = 0; i < this.bindingData.popUpMessages.length; i++) {
    //       this.showMessage(this.bindingData.popUpMessages[i]);
    //     }

    //     // days off selections
    //     this.daysOff = [[], [], []];
    //     // add daysOff to absences
    //     this.refreshDayOffChanges();

    //     // reserve selections
    //     this.reserveDefinitionSelection = this.bindingData.currentReserveOptions;
    //     // reserve assignments?
    //     this.bindingData.reserves.sort(helpers.Helpers.compare('startInx'));
    //     if (this.optionsTabs.activeTab === this.reserveTabInx) { // reserve
    //       if (this.absences != null && this.absences[1] != null && this.absences[1].length > 0) {
    //         this.bids = this.bindingData.reserves.concat();
    //         // this.bids = this.bindingData.reserves.concat(this.absences[1]).sort(helpers.Helpers.compare('startInx'));
    //         this.bids = this.bids.concat(this.absences[1]).sort(helpers.Helpers.compare('startInx'));
    //       } else {
    //         this.bids = this.bindingData.reserves.concat();
    //       }
    //     } else {

    //       // SEARCH RESULTS TABLE SETTINGS
    //       this.searchResultsPageCount = Math.ceil(this.bindingData.results.length / this.searchResultsPageSize);
    //       this.searchResultsCurrentPage = 1;
    //       this.searchResultsPages = [];

    //       for (i = 0; i < this.searchResultsPageCount; i++) {
    //         this.searchResultsPages[i] = i + 1;
    //       }
    //       if (this.searchResultsPageCount > 0) {
    //         this.changeSearchResultPage(1);
    //       }
    //     }

    //     // add to bid if appropriate
    //     if (this.autoAddToBid === true) {

    //       this.addToBid();
    //       // reset
    //       this.autoAddToBid = false;
    //       // reset trip prefs selections & description
    //       this.tripPreferencesSelection = [];
    //       this.criteriaDesciption = new models.CriteriaDescriptionVO();
    //       // searchTabs.activeTab will update in addToBid
    //     } else {
    //       if (this.optionsTabs.activeTab !== this.reserveTabInx) { // not reserve
    //         this.searchTabs.activeTab = 2;
    //       } else {
    //         this.searchTabs.activeTab = 0; // reserve
    //       }
    //     }

    //   });



    // const $combine = $funcConfigObservable.concat($getGUIResourcesObservable);

    // const $userDetailsNTimeParallel = Observable.forkJoin([$getUserDetailsObservable, $getTimeObservable]);

    // const $combine = $funcConfigObservable.concat($getGUIResourcesObservable)
    // .concat(Observable.forkJoin([$getUserDetailsObservable, $getTimeObservable]));

    // const $combine = $getFuncConfigObservable.concat($getIdentityObservable
    //   .concatMap(r => $getGUIResourcesObservable(r).concat(
    //     Observable.forkJoin([
    //       $getUserDetailsObservable(r).concat($getTripDetailsObservable(r)),
    //       $getTimeObservable
    //     ]

    //     ))));

    // const $combine = $getFuncConfigObservable.concat($getIdentityObservable.switchMap(r => $getGUIResourcesObservable(r)));

    // const $combine = $getFuncConfigObservable.concat($getIdentityObservable.map(m => m).concat(r => $getGUIResourcesObservable(r)));
    // const $combine = $getFuncConfigObservable.concat($getIdentityObservable.concatMap(r => $getGUIResourcesObservable(r)));
    // const $combine = $getFuncConfigObservable.switchMap(m => $getIdentityObservable, (m, k) => this.$getGUIResourcesObservable(m, k));



    // const $combine = $getFuncConfigObservable.
    // switchMap(f => $getIdentityObservable, ((f, i) => $getGUIResourcesObservable(f, i))).map(m => m);

    const $combine = $getFuncConfigObservable.concatMap(f => $getIdentityObservable.
      concatMap(i => this.getGUIVO(i, f).concat(Observable.forkJoin([
        this.getUserDetailsObservable(i).concat(this.getTripDetailsObservable(i, f)),
        $getTimeObservable
      ]))));


    // .concatMap(m => $getGUIResourcesObservable(this.funcConfig, m));

    // .concatMap(i => $getGUIResourcesObservable(this.funcConfig, i) ));

    // $getIdentityObservable.concatMap()

    // .switchMap(r => $getGUIResourcesObservable(r));

    //    this.__funcConfigService.getTime()
    // // this.__funcConfigService.getTime().concat(IntervalObservable.create(this.refreshTimeCallInterval))
    //   .do((date: Date) => {

    //     const diff = this.guiVO.resources.bidPeriodCloseDate.getMilliseconds() - date.getMilliseconds();

    //     this.bidCurrentDate = helpers.Helpers.toDateFormat(date, 'DD/MM/YY HH:mm:ss');

    //     // 86.400.000

    //     this.timeLeftToBid = helpers.Helpers.toDateFormat(diff, 'd\'d\' HH\'h\' mm\'m\'');

    //     if (diff < 120000) { // less then 2min=120s=120000ms

    //       if (diff < 20000) { this.refreshTimeCallInterval = 10000; } // 10s

    //       // change status to close STATUS=1
    //       this.isBidClosed = true;
    //       this.bidStatus = this.guiVO.config.bidStatuses[1].status;


    //     }
    //   }));

    // $identityObservable.concatMap
    // const $combine = $funcConfigObservable.concat($identityObservable.concat($getGUIResourcesObservable.concat($getTimeObservable)));

    // const $combine = $funcConfigObservable.concat($identityObservable.concat); //
    // ($getGUIResourcesObservable.concat($getTimeObservable)));



    $combine.subscribe((k) => {
      console.log('Subscribe Event'); console.log(k);
   },
      this.errorHandler, () => this.__loadingDialogRef.close());

    // $combine.subscribe((a, b, c) => console.log(a, b, c));

    // $combine.subscribe(
    //   (funcConfig: models.FuncConfigVO) => {
    //     this.__loadingDialogRef.componentInstance.title = 'Loading Identity...';

    //     this.funcConfig = funcConfig;
    //     console.log(funcConfig);
    //   },
    //   (i: models.IdentityVO) => {
    //     this.identity = i;

    //     this.identity.useEmployeeID = this.funcConfig.useEmployeeID;


    //     console.log(i);

    //   },
    //   (guiVO: models.GUIVO) => {

    //     this.guiVO

    //     console.log(guiVO);

    //   },
    //   () => {
    //     this.__loadingDialogRef.close();
    //   }

    // );


    // Observable
    // .zip(
    //     this.appService.GetCategories()
    //     this.appService.GetCartItems()
    // )
    // .catch(err => this.toaster.error(err))
    // .subscribe(([categories, cartItems]) => {
    //     this.appService.categories = categories;
    //     this.appService.cart = cartItems;
    // });



  }

  private errorHandler(error) {
    console.log(error);
  }


  showMessage(msg: models.PopupMessageVO) {
    // let modal = $modal({ show: false, title: msg.title, content: msg.text, backdrop: false, scope: this,
    //   template: 'Scripts/tpl/PopupMessageModal.tpl.html' }); //
    // modal.$promise.then(function () {
    //     modal.show();
    // })
  }


  /////////////-------- ADD TO BID ----------//////////////

  addToBidClick() {
    // this.previousTripPreferencesDescription = this.bindingData.description;

    this.addToBid();
    this.bidIsSaved = false;

    // reset trip prefs selections & description
    this.tripPreferencesSelection = [];
    this.tripPreferencesSelection[0] = 2; // 2-priority
    this.criteriaDesciption = new models.CriteriaDescriptionVO();

    this.previousTripPreferencesSearch = this.bindingData.search;

  }

  addToBid() {

    const trips = this.guiVO.resources.tripsData.IndexToTrips;
    const bids = this.bindingData.bids;
    const len = bids.length;
    let trip;
    let i = 0;
    this.availableBidTrips = [];

    // update bid description top box
    this.previousTripPreferencesDescription = this.bindingData.description;

    // extract trips to be shown on TRIPS calendar
    for (; i < len; i++) {
      trip = trips[bids[i].tripInx];
      if (bids[i].CLINE === 1) {
        this.availableBidTrips.push(trip);
      }
    }

    ////why data arent sorterd by startInx on server???
    this.availableBidTrips.sort(helpers.Helpers.compare('startInx'));

    // UPDATE & SHOW "BID TRIPS" SEARCH TAB
    this.tripsAddedToBid = bids;
    // update pagination
    this.bidsTripsPageCount = Math.ceil(this.tripsAddedToBid.length / this.bidsTripsPageSize);
    this.bidsTripsCurrentPage = 1;
    this.bidTripsPages = [];

    for (i = 0; i < this.bidsTripsPageCount; i++) {
      this.bidTripsPages[i] = i + 1;
    }

    if (this.bidsTripsPageCount > 0) {
      this.changeBidTripsPage(1);
    }

    // show tab
    this.searchModeTabs.activeTab = 3;

    this.availableBidTrips = this.availableBidTrips.concat(this.absences[1]).sort(helpers.Helpers.compare('startInx'));

    this.bids = this.availableBidTrips;

  }

  /////////--------   CHANGE SEARCH RESULT PAGE HANDLER --------////////////////
  changeSearchResultPage(page: number) {
    this.fromSearchResult = (page - 1) * this.searchResultsPageSize;
    this.toSearchResult = Math.min(page * this.searchResultsPageSize, this.bindingData.results.length);
    this.searchResultsCurrentPage = page;
  }

  /////////--------   BID TRIPS PAGE HANDLER --------////////////////
  changeBidTripsPage(page: number) {
    this.fromBidTrip = (page - 1) * this.bidsTripsPageSize;
    this.toBidTrip = Math.min(page * this.bidsTripsPageSize, this.tripsAddedToBid.length);
    this.bidsTripsCurrentPage = page;
  }



  //////////////////////-------------- SAVE BID -----------/////////////////////
  saveBid() {

    let isActive = 'A';

    if (this.identity.details.bidOfRecord !== this.optionsTabs.activeTab + 1) {
      isActive = 'I';
    }

    // this.LoadingModal.$promise.then(function () {
    //     this.LoadingModal.show();
    // })

    this.__loadingDialogRef.componentInstance.title = 'Saving bid...';

    const bid = '0' + (this.optionsTabs.activeTab + 1);
    const OFstring = 'OF' + (' ' + this.daysOff[0].filter(helpers.Helpers.filterType(models.DaysOffRangeVO)).join(' ')).trimR()
      + (' ' + this.daysOff[1].filter(helpers.Helpers.filterType(models.DaysOffRangeVO)).join(' ')).trimR()
      + (' ' + this.daysOff[2].filter(helpers.Helpers.filterType(models.DaysOffRangeVO)).join(' ')).trimR();
    const OPstring = 'OP' + this.linePreferencesSelection.join(' ');
    const SORTstring = 'SORT ' + this.tripPreferencesSelection[0] + (' ' + this.tripPreferencesSelection.join(' ').substr(2)).trimR();

    this.diagnosticText += '\n<b class=\'blue\'>' + bid + ' ' + Command.SaveFileCommand
      + ' ' + bid + ' ' + isActive + ' ' + OFstring + '/' + OPstring + '/' + SORTstring + '</b>\n';

    this.__commandService.SaveBid(this.identity.getIdentity(), bid, Command.SaveFileCommand, isActive,
      OFstring, OPstring, SORTstring, this.identity.dataSetID, this.DEBUG);

    this.bidIsSaved = true;

  }


  ///////////////  SAVE   ////////////////////
  onSaveBidClick() {
    // if its bidOfRecord just save it
    if (this.identity.details.bidOfRecord === this.optionsTabs.activeTab + 1) {
      // SAVE
      this.saveBid();
    } else {
      // this.SaveBidModal.$promise.then(function () {
      //     this.SaveBidModal.show();
      // })
    }
  }

  saveAsBidOfRecord() {

    // this.LoadingModal.$promise.then(function () {
    //     this.LoadingModal.show();
    // })
    this.identity.details.bidOfRecord = this.optionsTabs.activeTab + 1;
  }

  onReserveBidLineClick() {
    this.bidTabDirty = this.reserveTabInx;
  }

  resolveOverlapPriority(arrp1, arrp2) {
    const arrp1Len = arrp1.length;
    let item;
    for (let i = 0; i < arrp1Len; i++) {
      item = arrp1[i];
      for (let j = 0; j < arrp2.length; j++) {
        if (helpers.Helpers.itemInRange(item.startInx, item.endInx, arrp2[j], 'startInx', 'endInx')) {
          arrp2.splice(j, 1);
        }
      }
    }
  }



  /////////////////// NOT SAVING RESERVE BID WARNING ////////////////////
  refreshDayOffChanges() {
    // console.log('refreshDayOffChanges');

    const absence = null;
    let absenceLen = 0;
    const requestedDaysOffLen = 0;

    // add daysOff to absences
    if (this.bindingData.requestedDaysOff != null) {

      absenceLen = this.absences[0].length;

      if (this.bindingData.requestedDaysOff.length > 0 && this.bindingData.requestedDaysOff[0] != null) {
        // filter requested daysoff data that overlapped with absences
        this.resolveOverlapPriority(this.absences[0], this.bindingData.requestedDaysOff[0]);
        this.daysOff[0] = this.absences[0].concat(this.bindingData.requestedDaysOff[0])
          .sort(helpers.Helpers.compare('startInx'));
      } else {
        this.daysOff[0] = this.absences[0].concat().sort(helpers.Helpers.compare('startInx'));
      }

      // this.daysOff[0] = this.bindingData.requestedDaysOff[0].sort(helpers.Helpers.compare('startInx'));

      if (this.bindingData.requestedDaysOff.length > 1 && this.bindingData.requestedDaysOff[1] != null) {
        // filter requested daysoff data that overlapped with absences
        this.resolveOverlapPriority(this.absences[1], this.bindingData.requestedDaysOff[1]);
        this.daysOff[1] = this.absences[1].concat(this.bindingData.requestedDaysOff[1]).sort(helpers.Helpers.compare('startInx'));
      } else {
        this.daysOff[1] = this.absences[1].concat().sort(helpers.Helpers.compare('startInx'));
      }

      if (this.bindingData.requestedDaysOff.length > 2 && this.bindingData.requestedDaysOff[2] != null) {
        // filter requested daysoff data that overlapped with absences
        this.resolveOverlapPriority(this.absences[2], this.bindingData.requestedDaysOff[2]);
        this.daysOff[2] = this.absences[2].concat(this.bindingData.requestedDaysOff[2]).sort(helpers.Helpers.compare('startInx'));
      } else {
        this.daysOff[2] = this.absences[2].concat().sort(helpers.Helpers.compare('startInx'));
      }

    } else {// no requested days off currently
      this.daysOff[0] = this.absences[0].concat();
      this.daysOff[1] = this.absences[1].concat();
      this.daysOff[2] = this.absences[2].concat();
    }





  }



  ///////////////////// STATISTICS //////////////////
  getMaxSuffiecience(statistics, total, top, height) {
    const b = top + Math.round((Math.max.apply(null, statistics) / total) * height);
    return b;
  }

  getMinSuffiecience(statistics, total, top, height) {
    const b = top + Math.round((Math.min.apply(null, statistics) / total) * height);
    return b;
  }


  onLogOff() {
    // this.LogOffModal.$promise.then(function () {
    //     this.LogOffModal.show();
    // })
  }

  logoff() {

    window.location.href = 'logout.aspx';
  }
}


