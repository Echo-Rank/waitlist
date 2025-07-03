import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            color: "#ffffff",
            fontFamily: "sans-serif",
            padding: "40px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Echo Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "80px",
                height: "80px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "20px",
              }}
            >
              <img
                src="https://echorank.app/Echo.png"
                alt="Echo Logo"
                width={60}
                height={60}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "48px",
                fontWeight: "800",
              }}
            >
              Echo
            </div>
          </div>

          {/* Playlist Text */}
          <div
            style={{
              display: "flex",
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Echo Playlist
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#cccccc",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            Rank, Rate, Relisten
          </div>

          {/* Playlist ID */}
          <div
            style={{
              display: "flex",
              fontSize: "16px",
              color: "#888888",
              marginTop: "30px",
            }}
          >
            Playlist ID: {id}
          </div>
        </div>
      ),
      {
        width: 800,
        height: 418,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate playlist image: ${e}`, {
      status: 500,
    });
  }
}
