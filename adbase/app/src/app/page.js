"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MediaOptionsABI from "../contracts/MediaOptions.json"; // ABI file

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with deployed address

export default function Home() {
  const [mediaList, setMediaList] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", reach: "" });

  // Load the media options from the contract
  useEffect(() => {
    const fetchMediaOptions = async () => {
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Local Hardhat node
      const contract = new ethers.Contract(CONTRACT_ADDRESS, MediaOptionsABI, provider);
      const mediaCount = await contract.getMediaCount();
      const media = [];
      for (let i = 0; i < mediaCount; i++) {
        const option = await contract.mediaList(i);
        media.push(option);
      }
      setMediaList(media);
    };

    fetchMediaOptions();
  }, []);

  // Handle adding a new media option
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, price, reach } = form;

    try {
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, MediaOptionsABI, signer);
      await contract.addMedia(name, category, ethers.utils.parseUnits(price, "ether"), parseInt(reach));

      alert("Media added successfully!");
      setForm({ name: "", category: "", price: "", reach: "" });
    } catch (error) {
      console.error("Error adding media:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Media Options</h1>

      {/* Add Media Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Price (ETH)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Reach"
          value={form.reach}
          onChange={(e) => setForm({ ...form, reach: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Media
        </button>
      </form>

      {/* Display Media List */}
      <h2 className="text-xl font-bold mb-4">Available Media Options</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mediaList.map((media, index) => (
          <div key={index} className="border p-4">
            <h3 className="font-bold">{media.name}</h3>
            <p>Category: {media.category}</p>
            <p>Price: {ethers.utils.formatUnits(media.price, "ether")} ETH</p>
            <p>Reach: {media.reach.toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
