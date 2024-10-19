interface ErrorProps {
    message?: string | null; 
}

export default function Error({ message }: ErrorProps) {
    return (
        <div className="error-wrapper">
            <div className="error error-box">
                <h1 className="error-title">Some error occured</h1>
                <div className="error-message">
                    {message}
                </div>
            </div>
        </div>
    )
}