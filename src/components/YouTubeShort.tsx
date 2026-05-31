interface Props {
  id: string
}

export default function YouTubeShort({ id }: Props) {
  return (
    <div className="my-4 flex justify-center">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title="YouTube Short"
        className="rounded-lg"
        width="315"
        height="560"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
