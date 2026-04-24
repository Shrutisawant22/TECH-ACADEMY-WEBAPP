import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });

  // ==========================
  // FETCH COURSE
  // ==========================
  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch("http://localhost:5000/api/courses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();
      const found = data.data.find((c) => c._id === courseId);
      setCourse(found);
      setLoading(false);
    };

    fetchCourse();
  }, [courseId]);

  // ==========================
  // PAYMENT
  // ==========================
  const handlePayment = async () => {
    if (!card.number || !card.expiry || !card.cvv) {
      alert("Fill all card details ❗");
      return;
    }

    setProcessing(true);

    setTimeout(async () => {
      await fetch("http://localhost:5000/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ courseId })
      });

      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/my-courses");
      }, 2000);
    }, 1500);
  };

  if (loading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  return (
    <>
      <style>{`
        .container {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #020617, #0f172a);
          color: white;
        }

        .left {
          flex: 1;
          padding: 40px;
        }

        .right {
          width: 400px;
          padding: 30px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255,255,255,0.1);
        }

        .course-img {
          width: 100%;
          border-radius: 15px;
          margin-bottom: 20px;
        }

        .price {
          font-size: 30px;
          color: #22c55e;
          margin: 10px 0;
        }

        .input {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border-radius: 10px;
          border: none;
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .btn {
          margin-top: 20px;
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn:hover {
          transform: scale(1.05);
        }

        .success {
          text-align: center;
          margin-top: 50px;
          font-size: 24px;
          color: #22c55e;
          animation: pop 0.5s ease;
        }

        @keyframes pop {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .summary {
          font-size: 14px;
          color: #94a3b8;
        }
      `}</style>

      <div className="container">

        {/* LEFT SIDE */}
        <div className="left">
          <h2>{course.title}</h2>
          <img src={course.thumbnail} className="course-img" alt="" />
          <p>{course.description}</p>

          <div className="summary">
            ⭐ {course.rating} • 👨‍🎓 {course.studentsEnrolled}+ students
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          {success ? (
            <div className="success">
              🎉 Payment Successful <br />
              Redirecting...
            </div>
          ) : (
            <>
              <h3>Checkout</h3>

              <div className="price">
                ₹{course.price || 499}
              </div>

              <input
                className="input"
                placeholder="Card Number"
                value={card.number}
                onChange={(e) =>
                  setCard({ ...card, number: e.target.value })
                }
              />

              <input
                className="input"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) =>
                  setCard({ ...card, expiry: e.target.value })
                }
              />

              <input
                className="input"
                placeholder="CVV"
                value={card.cvv}
                onChange={(e) =>
                  setCard({ ...card, cvv: e.target.value })
                }
              />

              <button className="btn" onClick={handlePayment}>
                {processing ? "Processing..." : "Pay Now 🚀"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}