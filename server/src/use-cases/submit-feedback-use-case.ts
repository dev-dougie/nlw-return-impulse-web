import { MailAdapter } from './../adapters/mail-adapter';
import { FeedbacksRepository } from './../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private maildAdapter: MailAdapter) {

    }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if(!type){
            throw new Error('Type is required')
        }

        if(!comment){
            throw new Error('comment is required')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });


        await this.maildAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px">`,
                `<p>Tipo do Feedback ${type}</p>`,
                `<p>Comentário ${comment}</p>`,
                screenshot ? `<img widht:"1366" src="${screenshot}" />` : '',
                `</div>`
            ].join("\n")
        })
    }
}