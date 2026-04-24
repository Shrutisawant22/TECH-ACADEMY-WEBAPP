import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [method, setMethod] = useState("card"); // card | upi

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  const [upiId, setUpiId] = useState("");

  // ================= FETCH =================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        setCourse(data.data.find((c) => c._id === courseId));
      } catch {
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  // ================= FORMAT =================
  const formatCardNumber = (v) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v) =>
    v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d{1,2})/, "$1/$2");

  // ================= VALIDATION =================
  const validate = () => {
    if (method === "card") {
      if (card.number.replace(/\s/g, "").length !== 16) return "Invalid card";
      if (card.cvv.length !== 3) return "Invalid CVV";
      if (!card.expiry.includes("/")) return "Invalid expiry";
      if (!card.name) return "Enter name";
    }

    if (method === "upi") {
      if (!upiId.includes("@")) return "Invalid UPI ID";
    }

    return "";
  };

  // ================= PAYMENT =================
  const handlePayment = async () => {
    const err = validate();
    if (err) return setError(err);

    setProcessing(true);
    setError("");

    try {
      await new Promise((r) => setTimeout(r, 1500));

      await fetch("http://localhost:5000/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ courseId })
      });

      setSuccess(true);

      setTimeout(() => navigate("/my-courses"), 2000);
    } catch {
      setError("Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="center">Loading...</div>;

  return (
    <div className="page">

      {/* LEFT */}
      <div className="left">
        <img src={course.thumbnail} className="img" alt="" />
        <h2>{course.title}</h2>
        <p>{course.description}</p>

        <div className="meta">
          ⭐ {course.rating} • {course.studentsEnrolled}+ students
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">

        {success ? (
          <motion.div
            className="success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            🎉 Payment Successful
          </motion.div>
        ) : (
          <>
            <h3>Secure Checkout 🔒</h3>

            {/* PAYMENT METHOD */}
            <div className="tabs">
              <button
                className={method === "card" ? "active" : ""}
                onClick={() => setMethod("card")}
              >
                💳 Card
              </button>

              <button
                className={method === "upi" ? "active" : ""}
                onClick={() => setMethod("upi")}
              >
                📱 UPI
              </button>
            </div>

            {/* CARD */}
            {method === "card" && (
              <>
                <div className="card-preview">
                  <p>{card.number || "**** **** **** ****"}</p>
                  <div className="row">
                    <span>{card.name || "YOUR NAME"}</span>
                    <span>{card.expiry || "MM/YY"}</span>
                  </div>
                </div>

                <input
                  placeholder="Name"
                  value={card.name}
                  onChange={(e) =>
                    setCard({ ...card, name: e.target.value })
                  }
                />

                <input
                  placeholder="Card Number"
                  value={card.number}
                  onChange={(e) =>
                    setCard({
                      ...card,
                      number: formatCardNumber(e.target.value)
                    })
                  }
                />

                <div className="row">
                  <input
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        expiry: formatExpiry(e.target.value)
                      })
                    }
                  />

                  <input
                    placeholder="CVV"
                    value={card.cvv}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        cvv: e.target.value.slice(0, 3)
                      })
                    }
                  />
                </div>
              </>
            )}

            {/* UPI */}
            {method === "upi" && (
              <div className="upi-box">
                <p>Scan QR or enter UPI ID</p>

                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=test@upi&pn=TechAcademy&am=${course.price || 499}`}
                  alt="QR"
                />

                <input
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}

            {error && <p className="error">{error}</p>}

            <button onClick={handlePayment}>
              {processing ? "Processing..." : `Pay ₹${course.price || 499}`}
            </button>

            <p className="secure">🔒 Secure Payment</p>
          </>
        )}
      </div>

      <style>{`
        .page {
          display: flex;
          min-height: 100vh;
          background: #020617;
          color: white;
        }

        .left {
          flex: 1;
          padding: 40px;
        }

        .right {
          width: 420px;
          padding: 30px;
          background: #0f172a;
        }

        .img {
          width: 100%;
          border-radius: 12px;
        }

        .tabs {
          display: flex;
          gap: 10px;
          margin: 15px 0;
        }

        .tabs button {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: none;
          background: #1e293b;
          color: white;
        }

        .tabs .active {
          background: #6366f1;
        }

        input {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border-radius: 8px;
          border: none;
          background: #1e293b;
          color: white;
        }

        .row {
          display: flex;
          gap: 10px;
        }

        .card-preview {
          background: linear-gradient(135deg,#6366f1,#8b5cf6);
          padding: 15px;
          border-radius: 12px;
        }

        .upi-box {
          text-align: center;
        }

        .upi-box img {
          margin: 10px auto;
        }

        button {
          width: 100%;
          margin-top: 15px;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #6366f1;
          color: white;
        }

        .error {
          color: red;
        }

        .success {
          text-align: center;
          color: #22c55e;
        }

        .center {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}