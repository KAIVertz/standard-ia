import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 })
    }

    const apiKey = process.env.BEEHIIV_API_KEY
    const pubId = process.env.BEEHIIV_PUBLICATION_ID

    if (!apiKey || !pubId) {
      return NextResponse.json({ error: "Config manquante" }, { status: 500 })
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      }
    )

    if (!res.ok) {
      const body = await res.text()
      console.error("Beehiiv error:", res.status, body)
      return NextResponse.json({ error: "Erreur Beehiiv" }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Subscribe error:", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
