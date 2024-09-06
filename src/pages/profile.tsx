import { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import React from "react";
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
import { toast } from "react-hot-toast";
import { Footer } from "@components/layout/footer";

const Profile: NextPage = () => {
    const [username, setUsername] = useState("Old Morty");
    const [totalWins, setTotalWins] = useState(10);
    const [tournaments, setTournaments] = useState(20);
    const [earnings, setEarnings] = useState(1500); // in USD
    const [teamInfo, setTeamInfo] = useState("Team Alpha");
    const [matchHistory, setMatchHistory] = useState([
      {
        agentName: "AgentName",
        kills: 12,
        deaths: 2,
        result: "Victory",
        matchID: "2022040501",
      },
      {
        agentName: "AgentName",
        kills: 9,
        deaths: 3,
        result: "Victory",
        matchID: "2022040502",
      },
    ]);
    const [nfts, setNfts] = useState([
      "Achievement Title",
      "Achievement Title",
    ]);
    const [stakedTokens, setStakedTokens] = useState(500);
    const [earnedRewards, setEarnedRewards] = useState(50);
    const [teamMembers, setTeamMembers] = useState([
      "Player1",
      "Player2",
      "Player3",
    ]);
    const [newMember, setNewMember] = useState(""); // For inviting new members

    const handleKickMember = (member: any) => {
      setTeamMembers(teamMembers.filter((m) => m !== member));
    };

    const handleInviteMember = () => {
      if (newMember && !teamMembers.includes(newMember)) {
        setTeamMembers([...teamMembers, newMember]);
        setNewMember("");
      }
    };

    return (
        <>
        <DrawerContainer>
        <PageContainer>
          <Header />
          <div className="profile-page flex flex-col items-center min-h-screen  py-8">
        <div className="max-w-6xl w-full">
          {/* Row 1: Avatar, Stats, and Team Management */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Avatar & Info */}
            <div className="col-span-1">
              <div className="flex items-center space-x-4">
                <img
                  className="w-24 h-24 object-cover rounded-full"
                  src="https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fipfs.io%2Fipfs%2FQmQCCX8hTxCaeLty5c18qpWi67wRW37bwLKaRJiwafAVP1%2Fsolchicks-2236.png&w=2048&q=75"
                  alt="Avatar"
                />
                <div>
                  <h3 className="text-4xl">{username}</h3>
                  <p className="text-gray-400 mt-2">
                    #332 Shooter | #151 MOBA | #12 Sports
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="col-span-1  p-4 rounded-lg text-center space-y-2">
              <h3 className="text-xl font-bold text-center mb-4">
                Player Stats
              </h3>
              <p className="text-lg">Total Wins: {totalWins}</p>
              <p className="text-lg">Tournament Participation: {tournaments}</p>
              <p className="text-lg">Total Earnings: {earnings} USD</p>
            </div>

            {/* Team Management */}
            <div className="col-span-1  p-4 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Team Management</h4>
              <div className="space-y-4">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <p>{member}</p>
                    <button
                      onClick={() => handleKickMember(member)}
                      className="bg-red-500 px-4 py-1 rounded "
                    >
                      Kick
                    </button>
                  </div>
                ))}
                <div className="flex items-center space-x-4 mt-4">
                  <input
                    type="text"
                    placeholder="Invite member"
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    className="w-full p-2 border rounded  "
                  />
                  <button
                    onClick={handleInviteMember}
                    className="bg-success text-white px-4 py-2 rounded "
                  >
                    Invite
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Staking & Rewards, NFT Collection */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Staking & Rewards */}
            <div className=" p-6 rounded-lg flex justify-between items-center">
              <div>
                <h5 className="text-lg font-semibold text-purple-400">
                  Tokens Staked
                </h5>
                <p className="text-gray-400">{stakedTokens} Tokens</p>
                <h5 className="text-lg font-semibold text-purple-400 mt-4">
                  Rewards Earned
                </h5>
                <p className="text-gray-400">{earnedRewards} Tokens</p>
              </div>
              <div className="space-x-4">
                <button className="bg-success text-white px-4 py-2 rounded ">
                  Stake Tokens
                </button>
                <button className="bg-red-500 px-4 py-2 rounded ">
                  Unstake Tokens
                </button>
              </div>
            </div>

            {/* NFT Collection */}
            <div className=" p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-purple-400 mb-4">
                NFT Collection
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {nfts.map((nft, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <img
                      className="w-12 h-12"
                      src="https://via.placeholder.com/50"
                      alt="NFT Icon"
                    />
                    <div>
                      <h5 className="text-purple-400">{nft}</h5>
                      <p className="text-gray-400">April 29, 2022</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Best Achievements & Recent Matches */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Best Achievements */}
            <div className=" p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-purple-400 mb-4">
                Best Achievements
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {nfts.map((nft, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <img
                      className="w-12 h-12"
                      src="https://via.placeholder.com/50"
                      alt="Achievement Icon"
                    />
                    <div>
                      <h5 className="text-purple-400">{nft}</h5>
                      <p className="text-gray-400">April 29, 2022</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Matches */}
            <div className=" p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-purple-400 mb-4">
                Recent Matches
              </h4>
              <div className="space-y-4">
                {matchHistory.map((match, idx) => (
                  <div key={idx} className="flex justify-between">
                    <div>
                      <p className="text-gray-400">{match.agentName}</p>
                      <p>
                        Kills: {match.kills} | Deaths: {match.deaths} | Result:{" "}
                        {match.result}
                      </p>
                    </div>
                    <p className="text-purple-400">Match ID: {match.matchID}</p>
                  </div>
                ))}
              </div>
            </div>
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
      
        </>
    );
}

export default Profile;