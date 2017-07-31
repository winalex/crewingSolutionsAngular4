
interface String {
    leadingChars(chars: string | number, length: number): string;
    trimL();
    trimR();
}


String.prototype.trimL = function () {
    return this.replace(/^\s+/, '');
};


String.prototype.trimR = function () {
    return this.replace(/\s+$/, '');
    // return this.replace(/~+$/, '');
};

String.prototype.leadingChars = function (chars: string | number, length: number): string {
    return (chars.toString().repeat(length) + this).substr(-length);
};
