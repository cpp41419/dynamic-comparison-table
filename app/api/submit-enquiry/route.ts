import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create Supabase client only if credentials are provided
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, courseName, providerId, state } = body

    // Check if Supabase is configured
    if (!supabase) {
      console.warn("Supabase not configured - enquiry not saved to database")
      return NextResponse.json({
        success: true,
        message: "Enquiry received (database not configured)"
      })
    }

    // Insert enquiry into Supabase
    const { data, error } = await supabase
      .from("enquiries")
      .insert([
        {
          name,
          email,
          phone,
          message,
          course_name: courseName,
          provider_id: providerId,
          state,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to save enquiry" }, { status: 500 })
    }

    // Send email notification to simon@cpp41419.com.au
    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "noreply@yourdomain.com",
          to: ["simon@cpp41419.com.au"],
          subject: `New Course Enquiry - ${courseName}`,
          html: `
            <h2>New Course Enquiry</h2>
            <p><strong>Course:</strong> ${courseName}</p>
            <p><strong>Provider ID:</strong> ${providerId}</p>
            <p><strong>State:</strong> ${state}</p>
            <hr>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Message:</strong></p>
            <pre>${message || "No message provided"}</pre>
            <hr>
            <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
          `,
        }),
      })

      if (!emailResponse.ok) {
        console.error("Email sending failed:", await emailResponse.text())
      }
    } catch (emailError) {
      console.error("Email error:", emailError)
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
