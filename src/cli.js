import chalk from 'chalk'
import fs, { lstat } from 'fs'
import listaValidada from './http-validacao.js'
import pegaArquivo from './index.js'

const caminho = process.argv

async function imprimeLista(valida, resultado, identificador = '') {
  if (valida) {
    console.log(
      chalk.yellowBright('lista validada'),
      chalk.black.bgGreen(identificador),
      await listaValidada(resultado)
    )
  } else {
    console.log(chalk.yellowBright('lista de links'), chalk.black.bgGreen(identificador), resultado)
  }
}

async function processaTexto(argumentos) {
  const caminho = argumentos[2]
  const valida = argumentos[3] === '--valida'

  try {
    fs.lstatSync(caminho)
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log(chalk.red('arquivo ou diretório não existe'))
      return
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(caminho)
    imprimeLista(valida, resultado)
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho)
    arquivos.forEach(async (arquivo) => {
      const lista = await pegaArquivo(`${caminho}/${arquivo}`)
      imprimeLista(valida, lista, arquivo)
    })
  }
}

processaTexto(caminho)
