interface Props {
    message: string | undefined
}

export default function FormErrorMessage({message}: Props) {
  return (
    <span className="italic text-xs text-red-500">{message}</span>
  )
}
