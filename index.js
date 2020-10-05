const { google } = require('googleapis')
const key = require('./config/test1.json')
const express = require('express')
const router = express.Router()
const app = express()
const port = 5000;
const client = new google.auth.JWT(
	key.client_email,
	null,
	key.private_key,
	['https://www.googleapis.com/auth/spreadsheets']
)

const gsapi = google.sheets({ version: 'v4', auth: client })

var temp = gsGet(client)

console.dir(temp, { depth: null })


app.get('/', (req, res) => {
	res.send(temp)
})

app.listen(port, () => console.log(`app start on port http://localhost:${port}`))

router.get('/', gsGet)

console.log(key)

client.authorize((err, tokens) => {

	if (err) {
		console.log(err)
		return
	} else {
		console.log('Connect\n')
		console.log(tokens)
		// gsrun(client)
		gsGet(client)
	}

})


async function gsGet(cl) {

	const gsapi = google.sheets({ version: 'v4', auth: cl })

	const option = {
		spreadsheetId: '10f_F2Y10N2A8bRUp0NqGdd2LI2ooI8aGkv2e5FhDZ9U',
		range: 'Test!A3:F5'
	}

	let data = await gsapi.spreadsheets.values.get(option)

	console.log(`router got get data: \n`)
	console.dir(data, { depth: null })

}


// async function gsrun(cl) {

// 	const gsapi = google.sheets({ version: 'v4', auth: cl })

// 	const option = {
// 		spreadsheetId: '10f_F2Y10N2A8bRUp0NqGdd2LI2ooI8aGkv2e5FhDZ9U',
// 		range: 'Test!A1:F5'
// 	}

// 	let data = await gsapi.spreadsheets.values.get(option)
// 	console.log('\n')
// 	console.dir(data, { depth: null })

// 	let newData = data.data.values.map(d => {
// 		d.push((d[0] * 5) + '+' + (d[1] + 15) + '+' + (d[2] - 1) + '+' + (d[3] * 5) + '+' + (d[4] + 15))
// 		return d
// 	})
// 	console.dir(newData, { depth: null })

// 	const updateOption = {
// 		spreadsheetId: '10f_F2Y10N2A8bRUp0NqGdd2LI2ooI8aGkv2e5FhDZ9U',
// 		range: 'Test!L1',
// 		valueInputOption: 'USER_ENTERED',
// 		resource: { values: newData }
// 	}

// 	await gsapi.spreadsheets.values.update(updateOption)

// }