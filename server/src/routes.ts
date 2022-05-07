import { NodemailerMailAdapter } from './adapters/nodemailer/nodmailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import express from 'express';

import { prisma } from './prisma';
export const routes = express.Router();



routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    try {
        //wait the operation be finished
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
        const nodemailerMailAdapter = new NodemailerMailAdapter();
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);


        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot
        });

        return res.status(201).send()
    } catch (err) {
        console.log('error', console.error());
        return res.status(201).send()

    }
});
//SQLite, doesnt need install any aditional tool
//PRISMA doest need to use 