// ==========================
// 📁 src/admin/components/DataTable.jsx (ADVANCED)
// ==========================
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  selectable = false,
  onRowClick,
  actions,
  page = 1,
  totalPages = 1,
  onPageChange
}) {
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // ==========================
  // 🔍 SEARCH FILTER
  // ==========================
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  // ==========================
  // ✅ SELECT ROW
  // ==========================
  const toggleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // ==========================
  // 🎨 RENDER
  // ==========================
  return (
    <div className="table-container">

      {/* HEADER */}
      <div className="table-header">
        <input
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {actions && (
          <div className="actions">
            {actions.map((btn, i) => (
              <button key={i} onClick={btn.onClick}>
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {selectable && <th></th>}
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="center">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="center">
                  No data found
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <motion.tr
                  key={row._id}
                  whileHover={{ backgroundColor: "#1e293b" }}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {selectable && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row._id)}
                        onChange={() => toggleSelect(row._id)}
                      />
                    </td>
                  )}

                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          ◀
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          ▶
        </button>
      </div>

      {/* STYLES */}
      <style>{`
        .table-container {
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 20px;
          backdrop-filter: blur(20px);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .table-header input {
          padding: 10px;
          border-radius: 10px;
          border: none;
          background: #1e293b;
          color: white;
        }

        .actions button {
          margin-left: 10px;
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          background: #6366f1;
          color: white;
          cursor: pointer;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 12px;
          font-size: 13px;
          color: #94a3b8;
        }

        td {
          padding: 12px;
          border-top: 1px solid #1e293b;
        }

        tr {
          transition: 0.2s;
          cursor: pointer;
        }

        .center {
          text-align: center;
          padding: 20px;
        }

        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 15px;
          gap: 10px;
        }

        .pagination button {
          padding: 6px 12px;
          border-radius: 8px;
          border: none;
          background: #1e293b;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}