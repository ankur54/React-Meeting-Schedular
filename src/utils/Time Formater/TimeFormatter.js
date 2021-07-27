const timeFormatter = (time) => {
    let [hr, min] = time.split(':')
    hr = parseInt(hr)
    hr = (min[min.length - 2] === 'p' ? hr + 12 : hr)
    min = min.substring(0, 2)
    return `${hr}:${min}`
}

export default timeFormatter