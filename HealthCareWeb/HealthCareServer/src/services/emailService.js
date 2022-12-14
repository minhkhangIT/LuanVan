require('dotenv').config();
import nodemailer from 'nodemailer'
import moment from 'moment';

let sendEmail = async (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Thanh Loc" <loc0941466330@gmail.com>', // sender address
        to: data.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmail(data)  // html body
    });
}

let getBodyHTMLEmail = (data) => {
    let result = '';
    if (data.language === 'vi') {
        result = `
            <h3>Xin chào ${data.patientName} !</h3>
            <p>Bạn đã đặt lịch khám bệnh trên hệ thống HealthCare </p>
            <p>Thông tin của lịch khám bệnh:</p>
            <div><b>Thời gian: ${data.time}</b></div>
            <div><b>Bác sĩ: ${data.doctorName}</b></div>
            <p>Nếu thông tin chính xác, vui lòng click vào đường link bên dưới để hoàn thành thủ tục đặt lịch khám bệnh</p>
            <a href=${data.redirectLinkAccept} target="_blank">Chấp nhận</a>
          
            <p>Nếu có vấn đề phát sinh, bạn có thể hủy lịch hẹn bằng cách click vào link bên dưới</p>
            <a href=${data.redirectLinkCancel} target="_blank">Hủy</a>
            <div>Xin cám ơn quý khách !</div>
        `
    }
    if (data.language === 'en') {
        result = `
            <h3>Hello ${data.patientName} !</h3>
            <p>You have set up history on system HealthCare</p>
            <p>Information to schedule an appoinment:</p>
            <div><b>Time: ${data.time}</b></div>
            <div><b>Doctor: ${data.doctorName}</b></div>
            <p>If the information is correct, please click on the link below to complete the procedure to book an appointment</p>
            <a href=${data.redirectLinkAccept} target="_blank">Click here</a>
         
            <p>If problems arise, you can cancel your appointment by clicking on the link below</p>
            <a href=${data.redirectLinkCancel} target="_blank">Cancel</a>
            <div>Thank you very much !</div>
        `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            if (dataSend.location) {
                let info = await transporter.sendMail({
                    from: '"Thanh Loc" <loc0941466330@gmail.com>', // sender address
                    to: dataSend.email, // list of receivers
                    subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
                    html: getBodyHTMLEmailRemedy(dataSend),  // html body
                });
            } else {
                let info = await transporter.sendMail({
                    from: '"Thanh Loc" <loc0941466330@gmail.com>', // sender address
                    to: dataSend.email, // list of receivers
                    subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
                    html: getBodyHTMLEmailRemedy(dataSend),  // html body
                    attachments: [{
                        filename: `${dataSend.patientName}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }]
                });
            }
            // send mail with defined transport object

            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

let getBodyHTMLEmailRemedy = (data) => {
    let result = '';
    if (!data.language || data.language === 'vi') {
        if (data.location) {
            result = `
                <h3>Xin chào  ${data.patientName}!</h3>
                <p>Bạn đã hoàn thành quá trình khám bệnh thông qua hệ thống HealthCare</p>
                <p>Thông tin đơn thuốc của bạn đã được cập nhập trên tài khoản của bạn, vui lòng truy cập ứng dụng để xem chi tiết !</p>
                <div>Xin cám ơn quý khách!</div>
            `
        } else {
            result = `
                <h3>Xin chào  ${data.patientName}!</h3>
                <p>Bạn đã hoàn thành quá trình khám bệnh thông qua hệ thống HealthCare</p>
                <p>Thông tin đơn thuốc của bạn được đính kèm bên dưới:</p>
                <div>Xin cám ơn quý khách!</div>
            `
        }
    }
    if (data.language === 'en') {
        result = `
            <h3>Hello ${data.patientName}!</h3>
            <p>You have completed the medical examination process through the HealthCare system</p>
            <p>Your prescription/bill information is attached below:</p>
            <div>Thank you very much !</div>
        `
    }
    return result;
}

let sendEmailCancel = (email) => {
    email.forEach(data => {
        return new Promise(async (resolve, reject) => {
            try {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_APP, // generated ethereal user
                        pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                await transporter.sendMail({
                    from: '"Thanh Loc" <loc0941466330@gmail.com>', // sender address
                    to: data.emailPatient, // list of receivers
                    subject: "Thông báo hủy lịch hẹn trên hệ thống đặt lịch HealthCare !", // Subject line
                    html: getBodyHTMLEmailCancel(data),  // html body
                });
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    });
}

let getBodyHTMLEmailCancel = (data) => {
    var date = moment.unix(+data.date / 1000).format('DD/MM/YYYY') 
    var result = `
                <h3>Xin chào  ${data.fullNamePatient}!</h3>
                <p>Lịch hẹn khám bệnh của bạn với bác sĩ ${data.DoctorDataBooking.lastName}  ${data.DoctorDataBooking.firstName} vào lúc ${data.timeTypeDataBooking.valueVi} - ${date} đã bị hủy !</p>
                <p>Chúng tôi rất xin lỗi vì sự thay đổi này !</p>
                <p>Quý khách vui lòng truy cập ứng dụng để thay đổi lại lịch hẹn.</p>
                <div>Xin cám ơn quý khách!</div>
            `
    return result;
}

module.exports = {
    sendEmail: sendEmail,
    sendAttachment: sendAttachment,
    sendEmailCancel: sendEmailCancel
}
