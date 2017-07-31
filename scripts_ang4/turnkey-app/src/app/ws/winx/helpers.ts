

export class Helpers {

    static d_names_2: string[] = ['SU', 'MO', 'TU',
        'WE', 'TH', 'FR', 'SA'];



    static d_names_FULL: string[] = ['Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    static m_names_FULL: string[] = ['January', 'February', 'March',
        'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];


    static isOpera = (navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1;
    //// Firefox 1.0+
    static isFF = navigator.userAgent.indexOf('Firefox') !== -1;
    //// At least Safari 3+: '[object HTMLElementConstructor]'
    static isSafari = navigator.userAgent.indexOf('Safari') !== -1;
    //// Internet Explorer 6-11
    static isIE = /*@cc_on!@*/(navigator.userAgent.indexOf('MSIE') !== -1) || !!document.DOCUMENT_NODE;
    //// Edge 20+
    static isEdge = !Helpers.isIE && !!window.styleMedia;
    //// Chrome 1+
    // static isChrome = !!window.chrome && !!window.chrome.webs


    static ToArrayOfObjectFieldValues(arr: Object[], field: string) {

        const output: Object[] = [];
        let item;
        for (let i = 0; i < arr.length; ++i) {
            item = arr[i][field];
            if (item !== undefined) {
                output.push(arr[i][field]);
            }
        }

        return output;

    }


    static objectIndexFindByKey(array, key, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return -1;
    }

    static insertAt(index, parent, elem) {

        if (index < parent.children.length) {
            parent.children.splice(index, 0, elem);
        } else {
            if (index === parent.children.length) {
                parent.appendChild(elem);
            }
        }

    }


    static filterType(type) {

        return function (element) {
            return element instanceof type;
        };
    }





    static toDateFormat(date: Date | number, format: string) {

        if (date instanceof Date) {


            let hrs;
            let min;

            hrs = date.getHours();
            if (hrs < 10) {
                hrs = '0' + hrs;
            }


            min = date.getMinutes();
            if (min < 10) {
                min = '0' + min;
            }


            return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear().toString().substr(2) + ' ' + hrs + ':' + min;
        } else {

            return Helpers.millisecondsToFormat(date, format);
        }


    }


    static millisecondsToFormat(ms: number, format: string) {
        const days: number = ms / 8.64e7; // | 0;
        const hrs: number = (ms % 8.64e7) / 3.6e6; // | 0;
        const mins: number = Math.round((ms % 3.6e6) / 6e4);

        return days + 'd ' + z(hrs) + 'h ' + z(mins) + 'm';

        function z(n) {
            return (n < 10 ? '0' : '') + n;
        }
    }


    static guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    // 'Models.GUIBindingsVO, MVCAngularProto'
    static toType($type: string, envi?) {

        // debugger; // tslint:disable-line no-debugger
        $type = $type.replace('+', '.');
        const arr = $type.split(',')[0].split('.');
        const len = arr.length;
        let i = 0;
        let result;

        if (envi === undefined) {
            i = 1;
            result = window[arr[0]];
        } else {
            i = 2;
            result = envi[arr[1]];
        }

        for (; i < len; i++) {
            try {
                result = result[arr[i]];
            } catch (err) {
                console.log(err + ' of ' + arr[i]);
            }

        }

        return result;
    }



    static itemInRange(startRange, endRange, item, lowestProp, highestProp) {

        let startInx;
        let endInx;

        if (startRange > endRange) { // => swap values

            startRange = startRange ^ endRange; // tslint:disable-line no-bitwise
            endRange = endRange ^ startRange; // tslint:disable-line no-bitwise
            startRange = startRange ^ endRange; // tslint:disable-line no-bitwise

        }




        startInx = item[lowestProp];
        endInx = item[highestProp];


        if (startInx >= startRange && startInx <= endRange) { return true; }

        if (endInx >= startRange && endInx <= endRange) { return true; }


        return false;
    }

    static inRange(startRange: number, endRange: number, arr, lowest: string, highest: string) {

        let startInx;
        let endInx;

        if (startRange > endRange) { // => swap values

            startRange = startRange ^ endRange; // tslint:disable-line no-bitwise
            endRange = endRange ^ startRange; // tslint:disable-line no-bitwise
            startRange = startRange ^ endRange; // tslint:disable-line no-bitwise

        }

        let item;

        // for (let itemProp in arr) {
        for (const itemProp of arr) {

            item = arr[itemProp];
            startInx = item[lowest];
            endInx = item[highest];


            if (startInx >= startRange && startInx <= endRange) { return true; }

            if (endInx >= startRange && endInx <= endRange) { return true; }
        }

        return false;
    }




    static removeDuplicates(a, compareFunc) {

        const duplicates = [];

        a.sort(compareFunc);

        for (let i = 1; i < a.length;) {

            if (compareFunc(a[i - 1], a[i]) === 0) {

                duplicates.push(a.splice(i, 1)[0]);
            } else {
                i++;
            }
        }


        return duplicates;
    }

    static compare(prop) {

        return function (a, b) {

            const propChain = prop.split('.');
            let aValue, bValue;
            let i = 1;
            const len = propChain.length;

            aValue = a[propChain[0]];
            bValue = b[propChain[0]];

            for (; i < len; i++) {
                aValue = aValue[propChain[i]];
                bValue = bValue[propChain[i]];
            }


            if (aValue < bValue) {
                return -1;
            }
            if (aValue > bValue) {
                return 1;
            }

            return 0;
        };
    }


    static toggleSelection(model, value) {
        const idx = model.indexOf(value);

        // is currently selected
        if (idx > -1) {
            model.splice(idx, 1);
        } else { // is newly selected
            model.push(value);
        }
    }








}





export class ModelFactory {
    /////////////////////////////////////////////////////
    // Pure mapping from JSON Object to Model class VO
    // dynamically based on JSON.NET Library $type property
    static toJSVO(cls, obj: Object, envi) {

        let item;


        let clsObject;
        // debugger; // tslint:disable-line no-debugger
        try {
            clsObject = new cls();
            // clsObject = Object.create(cls.prototype);
        } catch (err) {
            console.log(err + ' of ' + obj['$type']);

        }

        // filter constructor and function => set/get ers + init in constructor mems
        const members: string[] = Object.getOwnPropertyNames(cls.prototype).filter(x => (typeof cls[x]) !== 'function')
            .concat(Object.keys(clsObject));

        // for (let k in obj) {
        for (const k of members) {
            if (!obj.hasOwnProperty(k)) { continue; }

            item = obj[k];
            if (item instanceof Array) {
                item = ModelFactory.toArrayOfJSVO(item, envi);
            } else if (item instanceof Object && item.hasOwnProperty('$type') && item.$type.indexOf('System') < 0) {
                item = ModelFactory.toJSVO(Helpers.toType(item.$type, envi), item, envi);
            }

            clsObject[k] = item;
        }



        return clsObject;
        // return Object.create(cls.prototype, obj);
    }

    static toArrayOfJSVO(arr, envi) {
        const len = arr.length;
        let i;
        let item;

        for (i = 0; i < len; i++) {
            item = arr[i];
            if (item instanceof Array) {
                arr[i] = ModelFactory.toArrayOfJSVO(item, envi);
            } else if (item instanceof Object && item.hasOwnProperty('$type')) {
                arr[i] = ModelFactory.toJSVO(Helpers.toType(item.$type, envi), item, envi);
            }
        }

        return arr;
    }


    ///////////////////////////////////////////////////////////////////


    // // Create VO dynamically based on JSON.NET Library $type property
    // static createFromJSONDotNet(cls, obj) {
    //     let item;
    //     let arr;

    //     for (const k of Object.keys(obj)) {

    //         item = obj[k];

    //         if (item instanceof Array) {
    //             arr = obj[k];
    //             item = ModelFactory.toArrayOfJSONDotNetVO(arr);
    //         } else if (item instanceof Object && obj[k].hasOwnProperty('$type')) {
    //             item = ModelFactory.createAll(Helpers.toType(item.$type), item);
    //         }

    //         if ({}.hasOwnProperty.call(obj, k)) {
    //             obj[k] = { value: item };
    //         }

    //     }


    //     if (cls == null || cls.prototype == null) {
    //         console.log(cls.className);
    //     }

    //     return Object.create(cls.prototype, obj);
    // }



    // static toArrayOfJSONDotNetVO(arr: Array<Object>) {
    //     const len = arr.length;
    //     let i;
    //     let item;

    //     for (i = 0; i < len; i++) {
    //         item = arr[i];
    //         if (item instanceof Array) {
    //             arr[i] = ModelFactory.toArrayOfJSONDotNetVO(arr);
    //         } else if (item instanceof Object && item.hasOwnProperty('$type')) {
    //             arr[i] = ModelFactory.createFromJSONDotNet(Helpers.toType(item.$type), item);
    //         }
    //     }
    //     return arr;
    // }


    // //////////////////////////////////////////////////////////


    // // Create VO dynamically based on 'className' property
    // static createAll(cls, obj, environment) {


    //     let item;
    //     let arr;

    //     for (const k of Object.keys(obj)) {

    //         item = obj[k];
    //         if (item instanceof Array) {
    //             arr = obj[k];
    //             item = ModelFactory.toArrayOfVO(arr);
    //         } else if (item instanceof Object && obj[k].hasOwnProperty('className')) {
    //             if (environment[item.className] == null || environment[item.className].prototype == null) {
    //                 console.log(item.className);
    //             }
    //             item = ModelFactory.createAll(environment[item.className], item, environment);
    //         }

    //         if ({}.hasOwnProperty.call(obj, k)) {
    //             obj[k] = { value: item };
    //         }
    //     }

    //     if (cls == null || cls.prototype == null) {
    //         console.log(cls.className);
    //     }

    //     return Object.create(cls.prototype, obj);
    // }


    // static toArrayOfVO(arr, envi) {
    //     const len = arr.length;
    //     let i;
    //     let item;

    //     for (i = 0; i < len; i++) {
    //         item = arr[i];
    //         if (item instanceof Array) {
    //             arr[i] = ModelFactory.toArrayOfVO(arr);
    //         } else if (item instanceof Object && item.hasOwnProperty('className')) {
    //             arr[i] = ModelFactory.createAll(envi[item.className], item);
    //         }
    //     }

    //     return arr;
    // }


    ////////////////////////////////////////////////////////
    /// For single object with simple properties
    static create(cls, obj) {
        for (const k in obj) {
            if ({}.hasOwnProperty.call(obj, k)) {
                obj[k] = { value: obj[k] };
            }
        }
        return Object.create(cls.prototype, obj);
    }

}


    // export {Helpers,ModelFactory}

