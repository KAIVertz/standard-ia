export default function BeehiivEmbed() {
  return (
    <div className="w-full max-w-[560px]">
      <iframe
        src="https://subscribe-forms.beehiiv.com/f7cbf9b4-2e9e-4a08-97a8-9fb7fa7874cd"
        className="beehiiv-embed"
        data-test-id="beehiiv-embed"
        frameBorder="0"
        scrolling="no"
        style={{
          width: "100%",
          height: 291,
          margin: 0,
          borderRadius: 0,
          backgroundColor: "transparent",
          boxShadow: "none",
          maxWidth: "100%",
        }}
      />
    </div>
  )
}
