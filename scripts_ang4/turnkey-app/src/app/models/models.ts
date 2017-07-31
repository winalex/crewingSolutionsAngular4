import { Helpers } from './../ws/winx/helpers';



////////////////////////
export class OptionsVO {

    title: string;


    constructor(title: string) {
        this.title = title;

    }

}

export class SelectionVO {
    selected = null;
    prevSelected = null;

    constructor() {
        this.selected = null;
        this.prevSelected = null;
    }

    reset() {
        this.selected = undefined;
        this.prevSelected = undefined;
    }

    resetToValue(value) {
        this.selected = value;
        this.selected = value;
    }

}


////////////////////////
export class BidStatusVO {

    status: string;
    description: string;

    constructor() {
        this.status = '';
        this.description = '';
    }

}



/////////////////////////////
export class GUIBindingsVO {



    floatVac: Array<AbsenceRangeVO>;
    criteriaItems: Array<CriteriaItemVO>;
    reserves: Array<ReservTripVO>; // Array
    requestedDaysOff: Array<Array<DaysOffRangeVO>>[3]; // Array[[],[],[]]
    currentLinePreferences: string[]; // Array string
    currentReserveOptions: string[];


    description: string;
    explain: string;
    bidOfRecord = 0;

    message: string;
    popUpMessages: Array<PopupMessageVO>; // Array
    statistics = null; // BidStatisticsVO
    results: Array<SearchResultVO>; // search results
    search: string[]; // Array of strings representing trip importance priority and search criteria choosen
    bids: Array<BidItemVO>; // Array

    LINE: string; //
    diagnosticText: string;

    constructor() {
        this.floatVac = null;
        this.criteriaItems = null;
        this.reserves = null; // Array
        this.requestedDaysOff = null; // Array[[],[],[]]
        this.currentLinePreferences = null; // Array string
        this.currentReserveOptions = null;


        this.description = '';
        this.explain = '';
        this.bidOfRecord = 0;

        this.message = '';
        this.popUpMessages = null; // Array
        this.statistics = null; // BidStatisticsVO
        this.results = null; // search results
        this.search = null; // Array of strings representing trip importance priority and search criteria choosen
        this.bids = null; // Array

        this.LINE = ''; //
        this.diagnosticText = '';
    }
}



export class CriteriaDescriptionVO {
    tripPreferences: string[];
    tripsAvailable: number;
    diagnosticText: string;

    constructor() {
        this.tripPreferences = [];
        this.tripsAvailable = 0;
        this.diagnosticText = '';
    }
}



export class CriteriaMenuVO {

    criteriaItems: Array<CriteriaItemVO>;
    popUpMessages: Array<PopupMessageVO>;
    numMenus: number;
    description: string;
    message: string;
    diagnosticText: string;

    constructor() {
        this.criteriaItems = null;
        this.popUpMessages = null;
        this.numMenus = 0;
        this.description = '';
        this.message = '';
        this.diagnosticText = '';
    }
}


/////////////////////////
export class CriteriaItemVO {
    label = '';
    Conditions: Array<CriteriaConditionVO>; // Array
    code = '';
    Options: Array<CriteriaOptionVO>; // Array

    constructor() {
        this.label = '';
        this.Conditions = null; // Array CriteriaConditionVO
        this.code = '';
        this.Options = null; // Array
    }

}



////////////////////////////////////
export class CriteriaSelectionVO {
    prevSelected: string;
    private _option;
    private _condition: string;
    private _criteria: CriteriaItemVO;
    private _selected: string;


    constructor() {
        this.prevSelected = null;
        this._option = null;
        this._condition = '';
        this._criteria = null;
        this._selected = null;
    }

    get criteria(): CriteriaItemVO {
        return this._criteria;
    }

    set criteria(value: CriteriaItemVO) {
        this.prevSelected = this._selected;
        this._criteria = value;
        // reset
        //  this.prevSelected=undefined;
        this._option = null;
        // this._selected=undefined;
    }


    get option() {
        return this._option;
    }

    set option(value) {
        this.prevSelected = this._selected;
        this._option = value;
        // this._selected=undefined;
    }

    get condition() {
        return this._condition;
    }

    set condtion(value) {
        this.prevSelected = this._selected;
        this._condition = value;
        // this._selected=undefined;
    }

    get selected(): string {
        this._selected = null;

        if (this._option !== null) {
            this._selected = this._criteria.code + this._option + this._condition;
        }

        return this._selected;
    }


    reset() {
        this.criteria = null;
        this.option = null;
        this._condition = '';
        this._selected = null;
        this.prevSelected = null;
    }
}



//////////////////////////////////
export class CriteriaOptionVO {
    label: string;
    value: string;

    constructor() {
        this.label = '';
        this.value = '';
    }
}



/////////////////////////////////
export class CriteriaConditionVO {
    label: string;
    value: string;

    constructor() {
        this.label = '';
        this.value = '';
    }
}



///////////////////////////////
export class BidItemVO {
    tripInx: number;
    priority: number;
    auditCode: string;
    OLINE: number;
    CLINE: number;
    BLINE: number;

    cosntructor() {
        this.tripInx = -1;
        this.priority = 0;
        this.auditCode = '';
        this.OLINE = 0;
        this.CLINE = 0;
        this.BLINE = 0;
    }
}



////////////////////////////////
export class BidStatisticsVO {
    priority1 = 0;
    priority2 = 0;
    priority3 = 0;
    awardedLines: number[]; // Array
    backupLines: number[]; // Array
    neutral = 0;
    avoid = 0;
    infringes = 0;
    total = 0;

    constructor() {
        this.priority1 = 0;
        this.priority2 = 0;
        this.priority3 = 0;
        this.awardedLines = null; // Array
        this.backupLines = null; // Array
        this.neutral = 0;
        this.avoid = 0;
        this.infringes = 0;
        this.total = 0;
    }
}



///////////////////////
export class SearchResultVO {
    priority: number;
    shade: number;
    tripInx: number;

    constructor() {
        this.priority = 0;
        this.shade = 0;
        this.tripInx = -1;
    }
}



//////////////////////////////

// Following classes will be moved and will use Renderer2 or/and ViewChild

export class DayOffTableSettings {

    private __cellWidth: number = -1;
    private __cellHeight: number = -1;
    private __top: number = NaN;
    private __left: number = NaN;

    left() {
        // if (this.__left === NaN) {
        //     this.__left = parseInt(angular.element('#daysOffDiv').css('left')) + parseInt(angular.element('.priorityLabel').css('width'))
        //         + 2 * this.cellWidth();
        // }
        return this.__left;
    }

    top() {
        // if (this.__top === NaN) {
        //     this.__top = parseInt(angular.element('#daysOffDiv').css('top')) + this.cellHeight();
        // }
        return this.__top;
    }

    cellWidth() {
        // if (this.__cellWidth < 0) {
        //     if (Helpers.isFF) {
        //         this.__cellWidth = parseInt(angular.element('table.daysOffTable td.notActive').css('width')) + 1;
        //     } else {
        //         this.__cellWidth = parseInt(angular.element('table.daysOffTable td.notActive').css('width')) + 2;
        //     }
        // }
        return this.__cellWidth;
    }

    cellHeight() {
        // if (this.__cellHeight < 0) {
        //     if (Helpers.isFF) {
        //         this.__cellHeight = parseInt(angular.element('table.daysOffTable td').css('height')) - 1;
        //     } else {
        //         this.__cellHeight = parseInt(angular.element('table.daysOffTable td').css('height'));
        //     }
        // }
        return this.__cellHeight;
    }
}


////////////////////////////
export class DayOffSelection {
    linNum: number;


    // <td> cell
    startTimeCell = null;
    endTimeCell = null;

    constructor() {
        this.linNum = -1;


        // <td> cell
        this.startTimeCell = null;
        this.endTimeCell = null;
    }


    reset() {
        this.linNum = -1;
        if (this.startTimeCell != null) { this.startTimeCell.html(''); }
        this.startTimeCell = null;
        if (this.endTimeCell != null) { this.endTimeCell.html(''); }
        this.endTimeCell = null;
    }
}



///////////////////////////
export class DaysOffRangeVO {
    //    this._startDate=null;
    //    this._endDate=null;
    startInx: number;
    startHour: number;
    endInx: number;
    endHour: number;
    lineNum = 0;
    reserve = 0;
    priority = -1;
    leftToRightDirection = true;

    constructor() {
        this.startInx = NaN;
        this.startHour = NaN;
        this.endInx = NaN;
        this.endHour = NaN;
        this.lineNum = 0;
        this.reserve = 0;
        this.priority = -1;
        this.leftToRightDirection = true;
    }

    //    Object.defineProperty(this,'startDate',{
    //        get:function()
    //        {
    //            return this._startDate;
    //        },
    //        set:function(value)
    //        {
    //            this._startDate=new Date(value)
    //        }
    //    });
    //
    //
    //    Object.defineProperty(this,'endDate',{
    //        get:function()
    //        {
    //            return this._endDate;
    //        },
    //        set:function(value)
    //        {
    //            this._endDate=new Date(value)
    //        }
    //    });

    // toString override
    // DDHH1 DDHH2 P1P2PP3
    toString() {
        let s;
        // 2-digit dates + hours
        s = ('0' + this.startInx).slice(-2);
        s += this.startHour + ' ';
        s += ('0' + this.endInx).slice(-2);
        s += this.endHour + ' ';
        // line num (calendar priority)
        s += this.lineNum;
        // reserve protect
        s += this.reserve.toString();
        // 2-digit priority ordering of daysoff ranges
        s += ('0' + this.priority).slice(-2);
        console.log('returning:' + s);
        return s;
    }

}






///////////////////////////
export class PopupMessageVO {
    title: string;
    text: string;

    constructor() {
        this.title = '';
        this.text = '';
    }
}



////////////////////////
export class UserDetailsVO {
    daysOff: Array<AbsenceRangeVO>; // new Array();
    carryIn: CarryInVO; // new CarryInVO();
    bidOfRecord = 0;
    hasTab = false;
    crewMemberName = '';
    DAYS = null;
    TRPS = null;
    diagnosticText = '';

    constructor() {
        this.daysOff = null; // new Array();
        this.carryIn = null; // new CarryInVO();
        this.bidOfRecord = 0;
        this.hasTab = false;
        this.crewMemberName = '';
        this.DAYS = null;
        this.TRPS = null;
        this.diagnosticText = '';
    }
}



//////////////////////////
export class AbsenceRangeVO {

    typeLabel: string;
    startInx: number;
    endInx: number;
    startConstraint: number;
    endConstraint: number;

    constructor() {
        this.typeLabel = '';
        this.startInx = 0;
        this.endInx = 0;
        this.startConstraint = 0;
        this.endConstraint = 0;
    }
}



////////////////////////////
export class CarryInVO {
    days = 0;
    hours = 0;

    constructor() {
        this.days = 0;
        this.hours = 0;
    }
}



/////////////////////////////////
export class AirLineOptionVO {
    opCode: string;
    groupInx: string;
    description: string;

    constructor() {
        this.opCode = '';
        this.groupInx = '';
        this.description = '';
    }

}


////////////////////////
export class FlightInfoVO {
    private _date: Date;

    ///2-digit date Inx in calendar
    dateInx: number;

    /// <summary>
    /// 3-4-digit depart flight #
    /// </summary>
    ID: string;

    constructor() {
        this._date = null;

        ///2-digit date Inx in calendar
        this.dateInx = 0;

        /// <summary>
        /// 3-4-digit depart flight #
        /// </summary>

        this.ID = '';
    }

    /// <summary>
    ///  5-digit time 00:00
    /// </summary>
    get time() {
        let hrs = this._date.getHours().toString();
        hrs = ('0' + hrs).slice(-2);
        let mins = this._date.getMinutes().toString();
        mins = ('0' + mins).slice(-2);
        return hrs + ':' + mins;
    }

    /// <summary>
    ///  2-char day of the week
    /// </summary>
    get exShortDay() {
        return Helpers.d_names_2[this._date.getDay()];
    }

    /// <summary>
    ///  2-digit date
    /// </summary>
    get fullDate() {
        const dt = this._date.getDate();
        return ('0' + dt).slice(-2);
    }


    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }

}



///////////////////////////////
export class TripVO {
    /// <summary>
    /// 4-digit paring num // 5-digit paring num ex. 908L
    /// </summary>
    ID = -1;

    /// <summary>
    /// inx
    /// </summary>
    inx = -1;

    startInx = -1;
    endInx = -1;

    auditCode: string;

    /// array of places specified by 3 initials exp. MKC
    route = null;

    /// <summary>
    /// 2-digit SZ
    /// </summary>
    size = 0;

    /// <summary>
    /// 2-digit DP
    /// </summary>
    dutyPeriod: string;

    /// <summary>
    /// FlightInfoVO
    /// </summary>
    reportFlight: FlightInfoVO;

    /// <summary>
    /// FlightInfoVO
    /// </summary>
    releaseFlight: FlightInfoVO;

    /// <summary>
    /// 1-5-digit attributes
    /// </summary>
    attributes: string;

    /// <summary>
    /// block time
    /// </summary>
    blockTime: string;

    details = undefined;

    /// <summary>
    /// credit time
    /// </summary>
    creditTime: string;

    /// <summary>
    ///  credittime 2
    /// </summary>
    creditTime2: string;

    layovers: string;


    constructor() {
        /// <summary>
        /// 4-digit paring num // 5-digit paring num ex. 908L
        /// </summary>
        this.ID = -1;

        /// <summary>
        /// inx
        /// </summary>
        this.inx = -1;

        this.startInx = -1;
        this.endInx = -1;

        this.auditCode = '';

        /// array of places specified by 3 initials exp. MKC
        this.route = null;

        /// <summary>
        /// 2-digit SZ
        /// </summary>
        this.size = 0;

        /// <summary>
        /// 2-digit DP
        /// </summary>
        this.dutyPeriod = '';

        /// <summary>
        /// FlightInfoVO
        /// </summary>
        this.reportFlight = null;

        /// <summary>
        /// FlightInfoVO
        /// </summary>
        this.releaseFlight = null;

        /// <summary>
        /// 1-5-digit attributes
        /// </summary>
        this.attributes = '';

        /// <summary>
        ///  b
        /// </summary>
        this.blockTime = '';

        this.details = undefined;

        /// <summary>
        /// c
        /// </summary>
        this.creditTime = '';

        /// <summary>
        /// c2
        /// </summary>
        this.creditTime2 = '';

        this.layovers = '';
    }

}



///////////////////////
export class ReservTripVO {
    ID: number;
    startInx: number;
    endInx: number;

    constructor() {
        this.ID = -1;
        this.startInx = -1;
        this.endInx = -1;
    }
}



////////////////////////////////
export class ReserveDefVO {
    value: string;
    label: string;
    checked: boolean;

    constructor() {
        this.value = '';
        this.label = '';
        this.checked = false;
    }
}



///////////////////////////////
export class GUIVO {

    resources: GUIResourcesVO;
    config: GUIConfigVO;
    diagnosticText: string;

    constructor() {
        this.resources = new GUIResourcesVO();
        this.config = new GUIConfigVO();
        this.diagnosticText = '';
    }
}

/////////////////////////////
export class GUIResourcesVO {


    tripFormat: number;
    tripStartEndFormat: number;
    RSVDisplay: boolean;
    RSVPDisplay: boolean;
    useCalDating: boolean;
    lineOptions: Array<Array<AirLineOptionVO>>;
    auditArray: string[];
    reserveDefs: Array<ReserveDefVO>; // Dictionary of ReserveDefVO();
    tripsData: GUIResourcesVO.TripsCollection;

    bidPeriodText = '';
    disputeClose = '';
    reviewClose = '';

    /**
    * days initials MO TU WE...
    */
    calDayInitialsArray = null;

    /**
     * dates 30 31 01 02 ...
     */
    calDatesArray = null;
    opDatesArray = null;
    numOfLiveDays = 0;
    liveDaysShift = 0;
    liveDaysShiftEnd = 0;
    flightDaysShift = 0;


    private _bidperiodOpen: Date;
    private _bidperiodClose: Date;





    constructor() {
        this.tripFormat = 1;
        this.tripStartEndFormat = 1;
        this.RSVDisplay = true;
        this.RSVPDisplay = true;
        this.useCalDating = true;
        this.lineOptions = null;
        this.auditArray = null;
        this.reserveDefs = null; // Dictionary of ReserveDefVO();
        this.tripsData = new GUIResourcesVO.TripsCollection();

        this.bidPeriodText = '';
        this._bidperiodOpen = null;
        this._bidperiodClose = null;

        this.disputeClose = '';
        this.reviewClose = '';

        /**
        * days initials MO TU WE...
        */
        this.calDayInitialsArray = null;

        /**
         * dates 30 31 01 02 ...
         */
        this.calDatesArray = null;
        this.opDatesArray = null;
        this.numOfLiveDays = 0;
        this.liveDaysShift = 0;
        this.liveDaysShiftEnd = 0;
        this.flightDaysShift = 0;
    }

    get bidperiodOpen() {
        return this._bidperiodOpen.toDateString();
    }

    get bidPeriodOpenDate(): Date {
        return this._bidperiodOpen;
    }

    set bidperiodOpen(value: string) {
        this._bidperiodOpen = new Date(value);
    }

    get bidPeriodCloseDate(): Date {
        return this._bidperiodClose;
    }

    get bidperiodClose() {
        return this._bidperiodClose.toDateString();
    }

    set bidperiodClose(value: string) {
        this._bidperiodClose = new Date(value);
    }





}




export namespace GUIResourcesVO {
    export class TripsCollection {

        /* Array of TripVO */
        IndexToTrips: Array<TripVO>;

        /* Object of key=TripVO IDs and value=TripVO inx ??? */
        IDToTrips = null;

        constructor() {
            /* Array of TripVO */
            this.IndexToTrips = null;

            /* Object of key=TripVO IDs and value=TripVO inx */
            this.IDToTrips = null;
        }

        get(key: string | number) {

            if (typeof key === 'string') {
                return this.IndexToTrips[this.IDToTrips[key]];
            } else if (typeof key === 'number') {
                return this.IndexToTrips[key];
            }
        }

    };
}





////////////////////////////
function TripDetailsVO() {
    this.IndexToTrips = [];
    this.IDToTrips = {};
}



////////////////////////////
export class IdentityVO {

    employeeID: string;
    dataSetID: string;
    details: UserDetailsVO;
    isAdmin: number;
    seniorityNumber: number;
    useEmployeeID: boolean;

    constructor() {
        this.employeeID = '';
        this.dataSetID = '';
        this.details = null;
        this.isAdmin = 0;
        this.seniorityNumber = 0;
        this.useEmployeeID = false;
    }

    getIdentity() {
        if (this.useEmployeeID) {
            return this.employeeID;
        } else {
            return this.seniorityNumber;
        }
    }
}

////////////////////////////////
export class FuncConfigVO {
    readonly apiAddr: string;
    publicDemoMode: boolean;
    demoMonth: number;
    timeOffset: number;
    timeZone: string;
    bidPeriodTestDate: string;
    useEmployeeID: boolean;
    guiResourcesFile: string;
    tripDetailsFile: string;
    lastBuildFile: string;
    useDiagnostics: boolean;

    // must init or no property will be creaed with 'new'
    constructor() {
        this.apiAddr = '';
        this.publicDemoMode = false;
        this.demoMonth = 0;
        this.timeOffset = 0;
        this.timeZone = '';
        this.bidPeriodTestDate = '';
        this.useEmployeeID = false;
        this.guiResourcesFile = '';
        this.tripDetailsFile = '';
        this.lastBuildFile = '';
        this.useDiagnostics = false;

    }

    getGuiResourcesFile(): string {
        return this.guiResourcesFile;
    }

    set test(value: string) {

    }
}


//////////////////////////////
export class GUIConfigVO {

    linePrefsText: string;
    bidStatuses: Array<BidStatusVO>;

    constructor() {
        this.linePrefsText = '';
        this.bidStatuses = null;
    }
}


///////////////////////////////

