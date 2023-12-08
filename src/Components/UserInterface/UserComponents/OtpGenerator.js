
export default function OtpGenerator(){

    var otp=parseInt(Math.random()*8999)+1000 /* Generates four digit Otp value varying 
    from 1000 to 9999*/
    return otp;
}