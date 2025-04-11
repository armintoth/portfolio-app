import React, { useState, useMemo, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    asset: "",
    amount: "",
    price: "",
    note: ""
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [filterAsset, setFilterAsset] = useState("");
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [deleteModalIndex, setDeleteModalIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_investments");
    if (saved) {
      try {
        setInvestments(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved investments", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio_investments", JSON.stringify(investments));
  }, [investments]);

  const portfolioValue = useMemo(() => {
    return investments.reduce((sum, inv) => {
      const amount = parseFloat(inv.amount);
      const price = parseFloat(inv.price);
      return sum + (isNaN(amount) || isNaN(price) ? 0 : amount * price);
    }, 0);
  }, [investments]);

  const totalInvested = useMemo(() => {
    return investments.reduce((sum, inv) => {
      const amount = parseFloat(inv.amount);
      const price = parseFloat(inv.price);
      return sum + (isNaN(amount) || isNaN(price) ? 0 : amount * price);
    }, 0);
  }, [investments]);

  const profit = useMemo(() => {
    return totalInvested > 0
      ? `${(((portfolioValue - totalInvested) / totalInvested) * 100).toFixed(2)}%`
      : "0.00%";
  }, [portfolioValue, totalInvested]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updated = [...investments];
      updated[editingIndex] = formData;
      setInvestments(updated);
      setEditingIndex(null);
    } else {
      setInvestments([...investments, formData]);
    }
    setFormData({ date: "", asset: "", amount: "", price: "", note: "" });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(investments[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const filteredInvestments = investments.filter((inv) => {
    const matchesAsset = filterAsset === "" || inv.asset.toLowerCase().includes(filterAsset.toLowerCase());
    const fromDateOk = filterFromDate === "" || inv.date >= filterFromDate;
    const toDateOk = filterToDate === "" || inv.date <= filterToDate;
    return matchesAsset && fromDateOk && toDateOk;
  });

  const handleConfirmDelete = () => {
    if (deleteModalIndex !== null) {
      const updated = [...investments];
      updated.splice(deleteModalIndex, 1);
      setInvestments(updated);
      setDeleteModalIndex(null);
    }
  };

  return <div>React component goes here</div>;
}
