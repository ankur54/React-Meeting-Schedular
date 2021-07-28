import numberFormat from '../Number Formatter/NumberFormat'

const timeFormatter = (time) => {
    let [hr, min] = time.split(':')
    hr = +hr
    hr = (min[min.length - 2] === 'p' ? hr + 12 : hr)
    min = +(min.substring(0, 2))
    console.log(hr, min)
    return `${numberFormat(hr)}:${numberFormat(min)}`
}

export default timeFormatter