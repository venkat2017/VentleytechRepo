"use strict";(()=>{var e={};e.id=142,e.ids=[142],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,i){return i in t?t[i]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,i)):"function"==typeof t&&"default"===i?t:void 0}}})},1029:(e,t,i)=>{i.r(t),i.d(t,{config:()=>u,default:()=>d,routeModule:()=>p});var n={};i.r(n),i.d(n,{default:()=>c});var o=i(1802),r=i(7153),a=i(6249);let s=require("nodemailer");var l=i.n(s);async function c(e,t){if("POST"!==e.method)return t.status(405).json({success:!1,error:"Method Not Allowed"});try{let{email:i,jobTitle:n,fullName:o}=e.body,r=l().createTransport({host:"smtp.gmail.com",port:587,secure:!1,auth:{user:"vseemakurthi.ai@gmail.com",pass:"sdei ckni udvw oqjm".replace(/ /g,"")}});return await r.sendMail({from:'"Ventley Tech" <info@ventleytech.com>',to:i,subject:`Application Received - ${n}`,html:`
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Application Received!</h1>
                </div>
                <div class="content">
                  <p>Dear ${o},</p>
                  <p>Thank you for applying for the position of <strong>${n}</strong> at Ventley Tech.</p>
                  <p>We have successfully received your application and our recruitment team will review it carefully. If your qualifications match our requirements, we will contact you to schedule an interview.</p>
                  <p><strong>Here's what happens next:</strong></p>
                  <ul>
                    <li>Our team will review your application within 3-5 business days</li>
                    <li>Qualified candidates will be contacted for an initial screening</li>
                    <li>Selected candidates will proceed to technical/behavioral interviews</li>
                  </ul>
                  <p>If you have any questions, please don't hesitate to reach out to us at info@ventleytech.com</p>
                  <a href="https://ventleytech.com/en/careers" class="button">View More Opportunities</a>
                </div>
                <div class="footer">
                  <p>\xa9 2025 Ventley Tech. All rights reserved.</p>
                  <p>801 Springdale Drive, Suite 100i, Exton, PA 19341</p>
                </div>
              </div>
            </body>
            </html>
          `}),console.log(`Confirmation email would be sent to: ${i} for job: ${n}`),console.log(`Admin notification: New application from ${o} for ${n}`),t.status(200).json({success:!0,message:"Confirmation email sent successfully"})}catch(e){return console.error("Error sending confirmation email:",e),t.status(500).json({success:!1,error:"Failed to send confirmation email",message:e.message})}}let d=(0,a.l)(n,"default"),u=(0,a.l)(n,"config"),p=new o.PagesAPIRouteModule({definition:{kind:r.x.PAGES_API,page:"/api/careers/send-confirmation",pathname:"/api/careers/send-confirmation",bundlePath:"",filename:""},userland:n})},7153:(e,t)=>{var i;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return i}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(i||(i={}))},1802:(e,t,i)=>{e.exports=i(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var i=t(t.s=1029);module.exports=i})();