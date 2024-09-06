import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Header } from "@components/layout/header";
import { PageContainer } from "@components/layout/page-container";
import { HomeContent } from "@components/home/home-content";
import { DrawerContainer } from "@components/layout/drawer-container";
import { ButtonState } from "@components/home/button";
import { Menu } from "@components/layout/menu";
import { TxConfirmData } from "@pages/api/tx/confirm";
import { TxCreateData } from "@pages/api/tx/create";
import { TxSendData } from "@pages/api/tx/send";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { fetcher, useDataFetch } from "@utils/use-data-fetch";
import { Footer } from "@components/layout/footer";

const Create: NextPage = () => {
    const [game, setGame] = useState("");
    const [tournamentName, setTournamentName] = useState("");
    const [entryFee, setEntryFee] = useState("");
    const [prizePool, setPrizePool] = useState("");
    const [tournamentType, setTournamentType] = useState("single-elimination");
    const [playersPerTeam, setPlayersPerTeam] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [daoVoting, setDaoVoting] = useState(false);
    const [nftPrize, setNftPrize] = useState(false);

    const handleFormSubmit = (e: any) => {
      e.preventDefault();
      const formData = {
        game,
        tournamentName,
        entryFee,
        prizePool,
        tournamentType,
        playersPerTeam,
        startDateTime,
        daoVoting,
        nftPrize,
      };
      console.log("Tournament Data:", formData);
      // Handle logic for form submission
    };

    return (
        <DrawerContainer>
        <PageContainer>
          <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Form */}
        <div className="mt-8 max-w-xl w-full p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Create Tournament</h2>
          <form onSubmit={handleFormSubmit}>
            {/* Game Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Game Selection
              </label>
              <select
                value={game}
                onChange={(e) => setGame(e.target.value)}
                className="w-full p-2 border rounded  "
              >
                <option value="">Select Game</option>
                <option value="CSGO">CSGO</option>
                <option value="DOTA 2">DOTA 2</option>
                <option value="Fortnite">Fortnite</option>
                <option value="Call of Duty">Call of Duty</option>
                <option value="Apex Legends">Apex Legends</option>
                <option value="Valorant">Valorant</option>
                <option value="League of Legends">League of Legends</option>
              </select>
            </div>

            {/* Tournament Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Tournament Name
              </label>
              <input
                type="text"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                className="w-full p-2 border rounded  "
                placeholder="Enter tournament name"
              />
            </div>

            {/* Entry Fee */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Entry Fee (USD/Tokens)
              </label>
              <input
                type="number"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
                className="w-full p-2 border rounded  "
                placeholder="Set entry fee in tokens or USD"
              />
            </div>

            {/* Prize Pool Setup */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Prize Pool Setup
              </label>
              <input
                type="text"
                value={prizePool}
                onChange={(e) => setPrizePool(e.target.value)}
                className="w-full p-2 border rounded  "
                placeholder="Specify prize pool distribution or automatic"
              />
            </div>

            {/* Tournament Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Tournament Type
              </label>
              <select
                value={tournamentType}
                onChange={(e) => setTournamentType(e.target.value)}
                className="w-full p-2 border rounded  "
              >
                <option value="single-elimination">Single-Elimination</option>
                <option value="double-elimination">Double-Elimination</option>
                <option value="round-robin">Round-Robin</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {/* Team/Player Setup */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Team/Player Setup
              </label>
              <input
                type="number"
                value={playersPerTeam}
                onChange={(e) => setPlayersPerTeam(e.target.value)}
                className="w-full p-2 border rounded  "
                placeholder="Number of players per team or individual participants"
              />
            </div>

            {/* Start Date & Time */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="w-full p-2 border rounded  "
              />
            </div>

            {/* DAO Voting Option */}
            <div className="mb-4">
              <label className="inline-flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={daoVoting}
                  onChange={() => setDaoVoting(!daoVoting)}
                  className="mr-2"
                />
                Enable DAO Voting for rule changes or disputes
              </label>
            </div>

            {/* NFT Prize Options */}
            <div className="mb-4">
              <label className="inline-flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={nftPrize}
                  onChange={() => setNftPrize(!nftPrize)}
                  className="mr-2"
                />
                Add optional NFT rewards for winners
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-success text-white px-4 py-2 rounded"
              >
                Submit & Create Tournament
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Live Preview */}
        <div className="mt-8 p-6  shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Tournament Preview</h2>
          <div className="mb-4">
            <h3 className="text-xl font-bold">
              {tournamentName || "Tournament Name"}
            </h3>
            <p className="text-sm text-gray-400">{game || "Select a Game"}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm">Entry Fee: {entryFee || "N/A"} USD/Tokens</p>
          </div>

          <div className="mb-4">
            <p className="text-sm">Prize Pool: {prizePool || "TBD"}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm">Tournament Type: {tournamentType}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm">
              Players per Team: {playersPerTeam || "N/A"}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm">
              Start Date & Time: {startDateTime || "Schedule not set"}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm">
              DAO Voting Enabled: {daoVoting ? "Yes" : "No"}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm">NFT Prize: {nftPrize ? "Yes" : "No"}</p>
          </div>

          <div className="flex-grow">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://cdn.prod.website-files.com/62624e283b503f0ce727563e/65e5d68141479a4d3fc1e1f9_Game%20Web3.jpg"
              alt="Tournament Preview"
            />
          </div>
        </div>
      </div>
      <Footer />
      </PageContainer>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <Menu
          className="p-4 w-80 bg-base-100 text-base-content"
        />
      </div>
    </DrawerContainer>
    );
}

export default Create;