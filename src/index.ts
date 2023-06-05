// import puppeteer from 'puppeteer'
import cronJob from 'node-cron'
import { config } from 'dotenv'

config()

type telegramMessage = {
  chat_id: string
  text: string
  parse_mode: 'MarkdownV2'
}

const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_ID}/`

// async function checkIfAvaliable(): Promise<boolean> {
//   const browser = await puppeteer.launch({
//     headless: 'new',
//   })

//   const page = await browser.newPage()

//   await page.goto('https://www.strappyco.com.br/produtos/vibrador-pocket/')

//   console.log('## LOADING PAGE ##')
//   console.log(await page.title())
//   console.log()

//   try {
//     const inputValue = await page.$eval('input.js-addtocart', (el) => el.value)

//     if (!inputValue) {
//       throw new Error('input not found')
//     }

//     console.log('## FOUND THE BUTTON! ##')

//     // SUCCESS!!!
//     if (inputValue === 'Comprar') {
//       await browser.close()
//       console.log("### AND IT'S AVALIABLE!! ###")
//       return true
//     }
//     console.log('not avaliable :(')
//   } catch {
//     await browser.close()
//     console.log('### COULD NOT FIND BUTTON ###')
//     await sendTelegramNotification('1543936636', 'shit happened')
//     return false
//   }

//   await browser.close()
//   return false
// }

async function sendTelegramNotification(chatId: string, text: string) {
  const body: telegramMessage = {
    chat_id: chatId,
    parse_mode: 'MarkdownV2',
    text,
  }

  const response = await fetch(telegramUrl + 'sendMessage', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  })

  const json = await response.json()

  return json.ok as boolean
}

async function main() {
  console.log('DOIN STUFF!!!!!!!!!!')
  sendTelegramNotification('1543936636', 'testando denovo')
  
  // const isAvaliable = await checkIfAvaliable()
  // const mensagem = `
  //   Vamos vibrar de felicidade!
  
  //   [link do bagulho](https://www.strappyco.com.br/produtos/vibrador-pocket/)
  // `

  // if (isAvaliable) {
  //   const result = await Promise.all([
  //     sendTelegramNotification('2031747321', mensagem),
  //     sendTelegramNotification('1543936636', mensagem),
  //   ])

  //   if (result.every((i) => i)) {
  //     console.log('everything sent fine')
  //   }
  // }
}

console.log('app started')
sendTelegramNotification('1543936636', 'testetestestsetsettestestsetsetstseset')

// function main() {
  // console.log('runninn')
// }

const cron = cronJob.schedule('0 0-59 18 * * *', main)

cron.start()
