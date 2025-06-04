import { getDiscussionByFeedItemId } from "@/lib/supabase";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get discussion data by feed item ID
    const { data, error } = await getDiscussionByFeedItemId(id);

    if (error || !data) {
      console.log(`Discussion feed item ${id} not found:`, error);
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
              padding: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                }}
              >
                <img
                  src="https://echorank.app/Echo.png"
                  alt="Echo Logo"
                  width={50}
                  height={50}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "36px",
                  fontWeight: "bold",
                }}
              >
                Echo
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                textAlign: "center",
                color: "#cccccc",
              }}
            >
              Join the conversation on Echo
            </div>
          </div>
        ),
        {
          width: 800,
          height: 418,
        }
      );
    }

    // Extract discussion and user data
    const { title, content, user } = data;
    const displayName = user?.displayname || "Unknown User";
    const userImage = user?.imagesrc || "https://echorank.app/Echo.png";
    const discussionTitle = title || "Untitled Discussion";

    // Truncate content for preview
    const truncatedContent =
      content && content.length > 150
        ? content.substring(0, 150) + "..."
        : content || "Join the conversation...";

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
          }}
        >
          {/* Header with user info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                overflow: "hidden",
                marginRight: "15px",
                backgroundColor: "#ffffff",
              }}
            >
              <img
                src={userImage}
                alt={`${displayName}'s profile`}
                width={60}
                height={60}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                @{displayName}
              </div>
              <div
                style={{ display: "flex", fontSize: "18px", color: "#cccccc" }}
              >
                started a discussion
              </div>
            </div>
          </div>

          {/* Discussion content */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "20px",
                lineHeight: "1.2",
              }}
            >
              {discussionTitle}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "20px",
                color: "#cccccc",
                lineHeight: "1.4",
                flex: 1,
              }}
            >
              {truncatedContent}
            </div>
          </div>

          {/* Echo branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "18px",
                color: "#888888",
              }}
            >
              Join the conversation on Echo
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#ffffff",
                  borderRadius: "6px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                }}
              >
                <img
                  src="https://echorank.app/Echo.png"
                  alt="Echo Logo"
                  width={40}
                  height={40}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  fontWeight: "800",
                }}
              >
                Echo
              </div>
            </div>
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
    return new Response(`Failed to generate discussion image: ${e}`, {
      status: 500,
    });
  }
}
