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
              backgroundColor: "#f7f7f7",
              color: "#333",
              fontFamily: "sans-serif",
              padding: "40px",
            }}
          >
            <div style={{ fontSize: "32px", fontWeight: "bold" }}>
              Profile not found
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // Extract profile data
    const {
      imagesrc,
      firstname,
      lastname,
      displayname: username,
      bio,
      location,
    } = data;
    const fullName = [firstname, lastname].filter(Boolean).join(" ");

    const profileImageSrc = imagesrc || "https://echorank.app/Echo.png"; // Fallback to Echo logo

    // Create a profile card that resembles the Echo profile UI
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "40px",
            color: "#000",
            background: "white",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            {/* Profile picture */}
            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "9999px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src={profileImageSrc}
                alt={`${username}'s profile`}
                width={160}
                height={160}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            {/* Profile info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "8px",
                maxWidth: "70%",
              }}
            >
              {/* Name and verified badge */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div style={{ fontSize: "36px", fontWeight: "bold" }}>
                  {fullName}
                </div>
                {/* "Verified" badge - gold checkmark */}
                <div
                  style={{
                    backgroundColor: "#FFD700",
                    borderRadius: "9999px",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✓
                </div>
              </div>

              {/* Username */}
              <div style={{ fontSize: "24px", color: "#6b7280" }}>
                @{username}
              </div>

              {/* Location */}
              {location && (
                <div style={{ fontSize: "20px", color: "#6b7280" }}>
                  {location}
                </div>
              )}

              {/* Bio */}
              {bio && (
                <div style={{ fontSize: "20px", marginTop: "8px" }}>{bio}</div>
              )}
            </div>
          </div>

          {/* Bottom section - stats panel and follow button */}
          <div
            style={{
              display: "flex",
              marginTop: "40px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Stats */}
            <div style={{ display: "flex", gap: "30px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "28px", fontWeight: "bold" }}>179</div>
                <div style={{ fontSize: "18px", color: "#6b7280" }}>
                  Rankings
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "28px", fontWeight: "bold" }}>4067</div>
                <div style={{ fontSize: "18px", color: "#6b7280" }}>
                  Followers
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "28px", fontWeight: "bold" }}>448</div>
                <div style={{ fontSize: "18px", color: "#6b7280" }}>
                  Following
                </div>
              </div>
            </div>

            {/* Follow button */}
            <div
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "14px 36px",
                borderRadius: "9999px",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Follow
            </div>
          </div>

          {/* Echo branding */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div style={{ fontSize: "18px", color: "#6b7280" }}>
              echorank.app
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate profile image: ${e}`, {
      status: 500,
    });
  }
}
