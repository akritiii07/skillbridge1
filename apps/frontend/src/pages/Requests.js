import React, { useState } from "react";
import "../style.css";

function Requests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Maya Patel",
      avatar: "👩",
      offer: "Python",
      want: "React",
      status: "pending",
    },
    {
      id: 2,
      name: "Jordan Rivera",
      avatar: "👨🏽",
      offer: "UI Design",
      want: "JavaScript",
      status: "accepted",
    },
    {
      id: 3,
      name: "Sam Wilson",
      avatar: "🧑🏼",
      offer: "Cybersecurity",
      want: "HTML/CSS",
      status: "declined",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    const updated = requests.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setRequests(updated);
  };

  return (
    <div className="requests-page">
      <h1>Swap Requests</h1>

      {requests.map((req) => (
        <div className="request-card" key={req.id}>
          <div className="request-left">
            <div className="avatar">{req.avatar}</div>

            <div>
              <h3>{req.name}</h3>
              <p>
                Offers <span className="blue-pill">{req.offer}</span> for{" "}
                <span className="gray-pill">{req.want}</span>
              </p>
            </div>
          </div>

          <div className="request-right">
            {req.status === "pending" && (
              <>
                <button
                  className="reject-btn"
                  onClick={() => updateStatus(req.id, "declined")}
                >
                  ✕
                </button>

                <button
                  className="accept-btn"
                  onClick={() => updateStatus(req.id, "accepted")}
                >
                  ✓
                </button>
              </>
            )}

            {req.status === "accepted" && (
              <span className="accepted-badge">accepted</span>
            )}

            {req.status === "declined" && (
              <span className="declined-badge">declined</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Requests;