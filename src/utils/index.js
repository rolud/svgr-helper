const kebabToPascalCase = (value) => {
    const words = value.split('-')
    return words.map((w) => w[0].toUpperCase() + (w.length > 1 ? w.slice(1, w.length) : 0)).join('')
}

module.exports = {
    kebabToPascalCase
}