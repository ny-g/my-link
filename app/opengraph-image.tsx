import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "MyLink - 모든 링크를 한 곳에"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "80px 120px",
          fontFamily: "sans-serif",
          color: "#0f172a", // slate-900
        }}
      >
        {/* Left: Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "96px",
              fontWeight: "bold",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "#0f172a", // slate-900
              marginBottom: "32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>모든 링크를</span>
            <span>한 곳에.</span>
          </div>
          <div
            style={{
              fontSize: "36px",
              color: "#64748b", // slate-500
              fontWeight: "normal",
              letterSpacing: "-0.02em",
            }}
          >
            당신을 보여주는 단 하나의 페이지.
          </div>
          
          <div
            style={{
              marginTop: "60px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#007a55", // primary
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: "600",
                padding: "12px 32px",
                borderRadius: "9999px",
              }}
            >
              시작하기
            </div>
          </div>
        </div>

        {/* Right: Phone Mockup Container */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Subtle background glow for depth (slate-100/50 equivalent) */}
          <div
            style={{
              position: "absolute",
              top: "-10px",
              bottom: "-10px",
              left: "-10px",
              right: "-10px",
              backgroundColor: "#f8fafc", // slate-50
              boxShadow: "0 0 40px 10px rgba(241, 245, 249, 0.8)",
              borderRadius: "64px",
            }}
          />

          {/* Phone Frame */}
          <div
            style={{
              display: "flex",
              width: "380px",
              height: "560px",
              backgroundColor: "#f8fafc", // slate-50
              borderRadius: "40px",
              border: "6px solid #ffffff", // White border as in LandingPage
              padding: "32px",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", // shadow-2xl
              position: "relative",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                display: "flex",
                width: "96px", // w-24
                height: "96px", // h-24
                borderRadius: "48px",
                backgroundColor: "#e2e8f0", // slate-200
                border: "4px solid #ffffff",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "16px",
                marginBottom: "16px",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // shadow-sm
              }}
            >
              <span style={{ fontSize: "24px", fontWeight: "bold", color: "#94a3b8" }}>ML</span>
            </div>

            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a", marginBottom: "4px" }}>
              MyLink User
            </div>
            
            <div style={{ display: "flex", alignItems: "center", fontSize: "16px", color: "#64748b", marginBottom: "32px" }}>
              @mylink_user
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px" }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            {/* Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              {/* MockLink 1 */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "12px",
                  alignItems: "center",
                  border: "1px solid #f1f5f9", // slate-100
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "#f1f5f9", marginRight: "12px" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b" }}>포트폴리오</span>
                  <span style={{ fontSize: "12px", fontWeight: "500", color: "#94a3b8", marginTop: "2px" }}>portfolio.com</span>
                </div>
              </div>

              {/* MockLink 2 */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "12px",
                  alignItems: "center",
                  border: "1px solid #f1f5f9", // slate-100
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "#f1f5f9", marginRight: "12px" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b" }}>GitHub</span>
                  <span style={{ fontSize: "12px", fontWeight: "500", color: "#94a3b8", marginTop: "2px" }}>github.com</span>
                </div>
              </div>

              {/* MockLink 3 */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "12px",
                  alignItems: "center",
                  border: "1px solid #f1f5f9", // slate-100
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                }}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "#f1f5f9", marginRight: "12px" }} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b" }}>블로그</span>
                  <span style={{ fontSize: "12px", fontWeight: "500", color: "#94a3b8", marginTop: "2px" }}>blog.io</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
