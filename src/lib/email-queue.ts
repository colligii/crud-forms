import Queue from "bull";
import prisma from "../db/prisma";
import transporter from "./nodemailer-transporter";

const emailQueue = new Queue("email-queue", { redis: { host: process.env.REDIS_HOST, port: +(process.env?.REDIS_PORT ?? 0), password: process.env.REDIS_PASS } })

emailQueue.process(async (job, done) => {
    
    const user = await prisma.user.findFirst({
        where: {
            email: job.data.email,
            active: false
        }
    })

    console.log(user)

    if(!user) return done();



    await transporter.sendMail({
        from: '"crud forms" <crudforms@gmail.com>',
        to: user.email,
        subject: "Codigo ativação",
        html: `<h1>Olá ${user.email}<h1><span>É um prazer te velo aqui, use esse codigo para ativar sua conta: ${user.activation_code}</span>`
    })


    done()
})

export default emailQueue