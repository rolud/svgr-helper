const svgr =  require('@svgr/core').default
const fs = require('fs')

const { kebabToPascalCase } = require('./utils')

const main = () => {

    const args = process.argv.slice(2)

    const icon = args.includes('--icon')
    const typescript = args.includes('--typescript')
    const native = args.includes('--native')

    let prefix = null

    if (args.includes('--prefix')) {
        const i = args.findIndex((a) => a === '--prefix') + 1
        if (i !== 0) {
            if (i === args.length || args[i].match(/^--/)) {
                throw new Error('Error: wrong command arguments')
            }
            prefix = args[i]
        }
    }


    if (!fs.existsSync('./output')) {
        fs.mkdirSync('./output')
    }

    if (!fs.existsSync('./input')) {
        fs.mkdirSync('./input')
    }
    
    
    fs.readdir('./input', (err, files) => {

        if (err) {
            throw new Error(err.message)
        }

        if (files.length === 0) {
            console.log('There are no svgs to convert')
            return
        }

        files.forEach((filename) => {
            const newFilename = `${prefix ? prefix + '-' : ''}${filename.replace(/.svg$/i, '').replace(/_/g, '-')}`
            const componentName = `${kebabToPascalCase(newFilename)}Svg`

            fs.readFile(`./input/${filename}`, 'utf8', (readErr, data) => {
                if (readErr) {
                    throw new Error(readErr.message)
                }
                
                svgr(data, { 
                    icon, 
                    typescript, 
                    native, 
                    prettier: true,
                    plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
                }, { componentName, }).then(
                    (jsCode) => {
                        fs.writeFile(`./output/${newFilename}${typescript ? '.tsx' : '.jsx'}`, jsCode, () => { 
                            console.log(`${componentName} created and saved to ./output/${newFilename}`) 
                        })
                    },
                    )
                    
            })
        })
    })
        
}

main()

