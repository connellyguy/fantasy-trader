# fantasy-trader
A webapp for easy use of the reddit adjusted trade values sheet.

[ffdata.net](https://ffdata.net)

Trade value data is tabulated by /u/PeakedInHighSkool on reddit on a weekly basis. [Example post here.](https://www.reddit.com/r/fantasyfootball/comments/x83cnw/reddit_adjusted_trade_value_charts_week_1_we_made/). The base data and extra sheets are available to paid patrons via Google Sheets. This website pulls only the freely-accessible data from this Google Sheet into a database weekly.

To run locally:
`firebase emulators:start --only hosting,functions`

To run only client locally with changes:
`cd client`
`npm run start`
