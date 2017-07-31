// VSCode have no problems with typescript 2.4.2 angular reporting error:
// // MVCAngularProto/scripts_ang4/turnkey-app/src/app/command.enum.ts (3,21): Type '"SR"' is not assignable to type 'Command'
// export enum Command {
//     // LOGIN COMMAND
//     LoginCommand  = 'SR',

//     // READFILE
//     ReadFileCommand = 'READFILE',

//     // SORT
//     SortCommand = 'OF',

//     // SAVEFILE
//     SaveFileCommand = 'FILE',

//     // MENU
//     MenuCommand = 'MN',

//     // BID
//     BidRequestCommand = 'BID',

//     // DE
//     DescribeCommand = 'DE'
// }


export class Command {
    // LOGIN COMMAND
    static LoginCommand  = 'SR';

    // READFILE
    static ReadFileCommand = 'READFILE';

    // SORT
    static SortCommand = 'OF';

    // SAVEFILE
    static SaveFileCommand = 'FILE';

    // MENU
    static MenuCommand = 'MN';

    // BID
    static BidRequestCommand = 'BID';

    // DE
    static DescribeCommand = 'DE';
}
