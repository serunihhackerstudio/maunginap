
export function sendEmail(subject, targetMail, kodebooking, bank, atasnama, rekening, total){
    const request = require("request");
    const endp = `https://maunginap-mail-server.herokuapp.com/menunggu-pembayaran?targetmail=${targetMail}&kodebooking=${kodebooking}&bank=${bank}&atasnama=${atasnama}&rekening=${rekening}&total=${total}`;
    request(endp)
//     request(endp, function (error, response, body) {
//     console.error('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
// });
}

export function sendEmailPerpanjangan(subject, targetMail, kodebooking, bank, atasnama, rekening, total){
    const request = require("request");
    const endp = `https://maunginap-mail-server.herokuapp.com/menunggu-pembayaran-perpanjangan?targetmail=${targetMail}&kodebooking=${kodebooking}&bank=${bank}&atasnama=${atasnama}&rekening=${rekening}&total=${total}`;
    request(endp)
//     request(endp, function (error, response, body) {
//     console.error('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
// });
}


export function sendEmailRefund(subject, targetMail, kodebooking, total){
    const request = require("request");
    const endp = `https://maunginap-mail-server.herokuapp.com/menunggu-refund?targetmail=${targetMail}&kodebooking=${kodebooking}&total=${total}`;
    request(endp)
//     request(endp, function (error, response, body) {
//     console.error('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
// });
}

export function sendEmailJatuhTempo(subject, targetMail, kodebooking, namapenginapan){
    const request = require("request");
    const endp = `https://maunginap-mail-server.herokuapp.com/jatuh-tempo-pesanan?targetmail=${targetMail}&kodebooking=${kodebooking}&namapenginapan=${namapenginapan}`;
    request(endp)
//     request(endp, function (error, response, body) {
//     console.error('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
// });
}

export function sendCloudMessage(subject, judul, isipesan){
    const request = require("request");
    const endp = `https://maunginap-mail-server.herokuapp.com/cloud-messaging?judul=${judul}&isipesan=${isipesan}`;
    request(endp)
//     request(endp, function (error, response, body) {
//     console.error('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
// });
}
    
