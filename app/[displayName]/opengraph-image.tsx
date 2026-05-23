import { ImageResponse } from "next/og"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

export const runtime = "nodejs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

interface Props {
  params: {
    displayName: string
  }
}

// Next.js App Router params type definition for dynamic segments in route handlers / OG images
export default async function Image({ params }: Props) {
  // params might be a Promise in Next.js 15+, but let's await it safely
  const resolvedParams = await Promise.resolve(params)
  const displayName = resolvedParams.displayName

  let username = displayName
  let bio = "내 모든 링크를 한 곳에"
  let photoURL = null

  try {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("displayName", "==", displayName))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data()
      if (userData.username) username = userData.username
      if (userData.bio) bio = userData.bio
      if (userData.photoURL) photoURL = userData.photoURL
    }
  } catch (error) {
    console.error("Error fetching user for OG image:", error)
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          color: "#0f172a",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Decorative Element */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "800px",
            backgroundImage: "radial-gradient(circle, rgba(0, 122, 85, 0.08) 0%, rgba(0, 122, 85, 0) 60%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            right: "-20%",
            width: "600px",
            height: "600px",
            backgroundImage: "radial-gradient(circle, rgba(241, 245, 249, 0.8) 0%, rgba(241, 245, 249, 0) 60%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              backgroundColor: "#f8fafc",
              border: "6px solid #ffffff",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              marginBottom: "40px",
              overflow: "hidden",
            }}
          >
            {photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoURL}
                alt={username}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span
                style={{
                  fontSize: "72px",
                  fontWeight: "900",
                  color: "#94a3b8",
                  letterSpacing: "-0.05em",
                }}
              >
                {username.substring(0, 1).toUpperCase()}
              </span>
            )}
          </div>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              letterSpacing: "-0.04em",
              marginBottom: "16px",
              color: "#0f172a",
              textAlign: "center",
            }}
          >
            {username}
          </h1>

          <p
            style={{
              fontSize: "32px",
              color: "#64748b",
              fontWeight: "500",
              letterSpacing: "-0.02em",
              textAlign: "center",
              maxWidth: "800px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {bio}
          </p>
        </div>


      </div>
    ),
    { ...size }
  )
}
