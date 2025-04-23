import { getProfileByDisplayName } from "@/lib/supabase";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { displayname: string } }
) {
  try {
    const { displayname } = params;

    // Get profile data from Supabase
    const { data, error } = await getProfileByDisplayName(displayname);

    if (error || !data) {
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "#000000",
              color: "#ffffff",
              fontFamily: "sans-serif",
              padding: "20px",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Echo
            </div>
            <div style={{ fontSize: "32px" }}>@{displayname}</div>
          </div>
        ),
        {
          width: 800,
          height: 418,
        }
      );
    }

    // Extract profile data
    const { imagesrc, firstname, lastname, displayname: username } = data;
    const fullName = [firstname, lastname].filter(Boolean).join(" ");
    const profileImageSrc = imagesrc || "https://echorank.app/Echo.png"; // Fallback to Echo logo

    // Create a simpler profile card optimized for iMessage
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
            padding: "50px",
            alignItems: "center",
          }}
        >
          {/* Left side - Profile picture */}
          <div style={{ display: "flex", marginRight: "30px" }}>
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <img
                src={profileImageSrc}
                alt={`${username}'s profile`}
                width={200}
                height={200}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>

          {/* Right side - Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {fullName && (
              <div
                style={{
                  fontSize: "44px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {fullName}
              </div>
            )}
            <div
              style={{
                fontSize: "36px",
                color: "#cccccc",
                marginBottom: "20px",
              }}
            >
              @{username}
            </div>
            <div
              style={{
                fontSize: "24px",
                padding: "12px 30px",
                backgroundColor: "#ffffff",
                color: "#000000",
                borderRadius: "100px",
                fontWeight: "bold",
                display: "inline-block",
                textAlign: "center",
                maxWidth: "200px",
              }}
            >
              Follow
            </div>
          </div>

          {/* Echo Logo in corner */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              opacity: 0.8,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path
                d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30Z"
                fill="#ffffff"
              />
              <path
                d="M18 36C18 43.732 24.268 50 32 50C39.732 50 46 43.732 46 36C46 28.268 39.732 22 32 22"
                fill="#000000"
              />
              <path
                d="M12 24C12 31.732 18.268 38 26 38C33.732 38 40 31.732 40 24C40 16.268 33.732 10 26 10"
                fill="#000000"
              />
            </svg>
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
    return new Response(`Failed to generate profile image: ${e}`, {
      status: 500,
    });
  }
}
