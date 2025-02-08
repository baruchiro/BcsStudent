interface NoteProps {
  children: React.ReactNode
}

const Note = ({ children }: NoteProps) => {
  return (
    <div className="my-6 rounded-lg border-l-4 border-gray-200 bg-gray-50/50 p-4 dark:border-gray-600 dark:bg-gray-800/30">
      <div className="text-gray-600 dark:text-gray-400">{children}</div>
    </div>
  )
}

export default Note
