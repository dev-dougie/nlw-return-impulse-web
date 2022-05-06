import { useState } from "react";
import { CloseButton } from "../CloseButton";
import bugImageUrl from '../../assets/bug.png'
import ideaImageUrl from '../../assets/idea.png'
import thoughttImageUrl from '../../assets/thought.png'
import { FeedbackTypeStep } from "../Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "../Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "../Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: bugImageUrl,
            alt: 'Imagem de uma lagarta'
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }

    },
    OTHER: {
        title: "Outro",
        image: {
            source: thoughttImageUrl,
            alt: 'Imagem de uma nuvem de pensamento'
        }

    }
}

export type FeedbackType = keyof typeof feedbackTypes

//Object.entries(feedbackTypes) => [["BUG", {....}], [], []]

export function WidgetForm() {
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {
                feedbackSent ? (
                    <FeedbackSuccessStep onFeedbackRestartRequested={() => handleRestartFeedback()} />
                ) : (
                    <>
                        {!feedbackType ? (
                            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                        ) : (<FeedbackContentStep
                            onFeedbackSent={() => setFeedbackSent(true)}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            feeedbackType={feedbackType} />)}
                    </>
                )
            }


            <footer className="text-cs text-neutral-400">
                Feito com amor pela <a className="underline underline-offset-1" href="">Rocketseat</a>
            </footer>
        </div>
    );
}