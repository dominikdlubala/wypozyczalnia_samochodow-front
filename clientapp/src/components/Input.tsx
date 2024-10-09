interface InputProps {
    onChange: (x: string) => void; 
    value: string;
    className?: string; 
    onSubmit?: (term: string) => void;  
}
export default function Input({ onChange, value, className='', onSubmit }: InputProps) {


    return (
        <input
            className={`search-input ${className}`} 
            placeholder="Search..."
            value={value}
            onChange={(e:React.FormEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
            onKeyUp={onSubmit ? (e: React.KeyboardEvent<HTMLInputElement>) => {
                (e.key === 'Enter' && onSubmit(value))
            } : () => null}
        />
    )
}