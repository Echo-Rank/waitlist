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
    const { data } = await getProfileByDisplayName(displayname);

    // Get profile data
    const username = data?.displayname || displayname;
    const imageUrl = data?.imagesrc || "https://echorank.app/Echo.png";
    const followers = data?.follower_count || 0;
    const following = data?.following_count || 0;
    const isVerified = data?.verified || false;

    // Create a styled OG image similar to the app UI
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF", // White background
            padding: 40,
            color: "#000000",
            fontFamily: "system-ui, sans-serif",
            position: "relative",
          }}
        >
          {/* Echo logo in top right */}
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 40,
              fontSize: 36,
              fontWeight: "bold",
              opacity: 0.9,
            }}
          >
            echo
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              {/* Profile Image */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "100%",
                  overflow: "hidden",
                  marginRight: 24,
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid rgba(0,0,0,0.05)",
                  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={imageUrl}
                  alt={username}
                  width={120}
                  height={120}
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Username and stats */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: "bold",
                      marginRight: isVerified ? 10 : 0,
                    }}
                  >
                    @{username}
                  </div>
                  {isVerified && (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: "#FFD700",
                        borderRadius: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        color: "#000",
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    opacity: 0.7,
                    display: "flex",
                    color: "#333",
                  }}
                >
                  {followers} followers · {following} following
                </div>
              </div>
            </div>

            {/* Follow button outline */}
            <div
              style={{
                width: 120,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#000000",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 16,
                marginLeft: 144,
              }}
            >
              follow
            </div>
          </div>

          <div
            style={{
              fontSize: 24,
              opacity: 0.8,
              marginTop: 40,
              color: "#333",
            }}
          >
            @{username} on echo
          </div>
          <div style={{ fontSize: 16, opacity: 0.7, color: "#555" }}>
            echomusicapp.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error("Failed to generate OG image:", e);
    return new Response(`Failed to generate OG image: ${e}`, {
      status: 500,
    });
  }
}
