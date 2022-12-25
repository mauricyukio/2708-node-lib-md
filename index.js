import chalk from 'chalk'
import fs from 'fs'

// Testes com a lib 'chalk'
// console.log(chalk.green('olá mundo'))
// //encadear métodos para colorir texto, cor de fundo e texto em negrito
// console.log(chalk.blue.bgWhite.bold('Alura'))
// //receber múltiplos argumentos
// console.log(chalk.blue('curso', 'de', 'Node.js'))
// //métodos aninhados
// console.log(chalk.red('vermelho', chalk.underline.bgBlue('azul')))
// // uso de template strings e placeholders
// console.log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `)

function extraiLinks(texto) {
  const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
  const capturas = [...texto.matchAll(regex)]
  const resultados = capturas.map((captura) => ({ [captura[1]]: captura[2] }))

  return resultados
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'))
}

// Versão com async / await
async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = 'utf-8'
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
    extraiLinks(texto)
  } catch (erro) {
    trataErro(erro)
  }
}

// Versão com promises e then()
// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = 'utf-8'
//   fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(chalk.green(texto)))
//     .catch((erro) => trataErro(erro))
// }

// Versão síncrona
// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = 'utf-8'
//   fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//     if (erro) {
//       trataErro(erro)
//     }
//     console.log(chalk.green(texto))
//   })
// }

pegaArquivo('./arquivos/texto.md')
