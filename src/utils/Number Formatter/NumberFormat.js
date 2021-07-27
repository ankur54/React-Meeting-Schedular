const numberFormat = (num, digits) => {
    num = num.toString();
    while (num.length < digits) num = "0" + num;
    return num;
}

export default numberFormat