/*
 *
 */

Number.prototype.pad = function (size) {
    let strNumber = String(this)
    while(strNumber.length < size) {
        strNumber = '0' + strNumber
    }
    return strNumber
}
