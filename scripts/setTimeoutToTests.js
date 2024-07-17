const fs = require('fs')

// Converta a enumeração para formato de string
const enumAsString = `export enum PatternTimeout {
  TIMEOUTDATATABLE = 0,
}`

// Escreva no arquivo
fs.writeFile('./enums/timeout.enum.ts', enumAsString, (err) => {
  if (err) {
    console.error('Erro ao escrever no arquivo:', err)
    return
  }
  console.log('Value of timeout of datatable changed')
})
