'use client'

interface ErrorMessageDetailsProps{
    error: Error
}

const ErrorMessage = ({ error }: ErrorMessageDetailsProps) => {
    return <p>Could not fetch note details. {error.message}</p>
}

export default ErrorMessage; 