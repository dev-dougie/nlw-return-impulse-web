import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

describe('submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        const submitFeedback = new SubmitFeedbackUseCase(
            { create: async () => { } },
            { sendMail: async () => { } }
        );
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "There is a bug in the system",
            screenshot: 'test.jpg'
        })).resolves.not.toThrow();
    })
})