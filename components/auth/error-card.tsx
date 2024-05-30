import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { CardWrapper } from "./card-wrapper"

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Algo de errado aconteceu"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="w-full flex items-center justify-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    )
}