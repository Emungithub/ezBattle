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


const LeaderBoard: NextPage = () => {
        const [players, setPlayers] = useState([
          {
            username: 'Player1',
            name: 'John Doe',
            earnings: '50 SOL',
            tournamentsWon: 5,
            nftCollections: 10,
            imgSrc: 'https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fipfs.io%2Fipfs%2Fbafybeif5wh6kdvshcmf2t2a6kkw47mtmg4jgxjpth6qtg7gb7wmjyih72e%2Fsolchicks-398.png&w=2048&q=75',
          },
          {
            username: 'Player2',
            name: 'Jane Smith',
            earnings: '35 SOL',
            tournamentsWon: 3,
            nftCollections: 8,
            imgSrc: 'https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fipfs.io%2Fipfs%2FQmd7XdbsFJR3EsgJwx5nfGEjfrtfW2kAFnLdHiomcUnAz7%2Fsolchicks-1779.png&w=2048&q=75',
          },
          {
            username: 'Player3',
            name: 'Alice Johnson',
            earnings: '25 SOL',
            tournamentsWon: 2,
            nftCollections: 5,
            imgSrc: 'https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fipfs.io%2Fipfs%2Fbafybeifsp5kqfjt5vk7eglqrznhq2d7jve6gvuf5hb2xfoatg5kwg3b7cy%2Fsolchicks-2097.png&w=2048&q=75',
          },
          {
            username: 'Player3',
            name: 'Alice Johnson',
            earnings: '25 SOL',
            tournamentsWon: 2,
            nftCollections: 5,
            imgSrc: 'https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fipfs.io%2Fipfs%2Fbafybeihpago4es2brtaifkbcune2uter6a6hmcgfmfsw5davzqbx7cn7r4%2Fsolchicks-4996.png&w=2048&q=75',
          },
          {
            username: 'Player4',
            name: 'Alice Johnson',
            earnings: '25 SOL',
            tournamentsWon: 2,
            nftCollections: 5,
            imgSrc: 'https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fipfs.io%2Fipfs%2Fbafybeigmy4ezucxing5idg3spl7eryfsolxopsltike4ayotmqjwileje4%2Fsolchicks-4454.png&w=2048&q=75',
          },
          {
            username: 'Player5',
            name: 'Alice Johnson',
            earnings: '25 SOL',
            tournamentsWon: 2,
            nftCollections: 5,
            imgSrc: 'https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fipfs.io%2Fipfs%2FQmec1RrLQiFUW1byuTxBj7scynPZVaQmyaweHr8VWPTyqV%2Fsolchicks-127.png&w=2048&q=75',
          },
          {
            username: 'Player6',
            name: 'Alice Johnson',
            earnings: '1 SOL',
            tournamentsWon: 2,
            nftCollections: 5,
            imgSrc: 'https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Fipfs.io%2Fipfs%2Fbafybeibzu6ryndabbouhwzci52ytq4y7lakgphhapnefhj7slbgxxpmx4q%2Fsolchicks-690.png&w=2048&q=75',
          },
        ]);
      
        return (
            <DrawerContainer>
        <PageContainer>
          <Header />
          <div className="leaderboard-page flex flex-col items-center min-h-screen  py-8">
            <h2 className="text-3xl font-semibold mb-6">Leaderboard</h2>
      
            {/* Leaderboard List */}
            <div className="w-full max-w-5xl">
              {players.map((player, idx) => (
                <div
                  key={idx}
                  className=" p-4 rounded-lg shadow-lg flex items-center justify-between mb-4"
                >
                  {/* Rank */}
                  <div className="text-2xl font-bold text-gray-400 ml-4">{`#${idx + 1}`}</div>
      
                  {/* Avatar & Username */}
                  <div className="flex items-center w-1/3">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={player.imgSrc}
                      alt={player.username}
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-bold">{player.username}</h3>
                      <p className="text-sm text-gray-400">{player.name}</p>
                    </div>
                  </div>
      
                  {/* Stats */}
                  <div className="flex items-center w-1/3 justify-around">
                    <div className="text-center">
                      <p className="text-xl font-semibold">{player.tournamentsWon}</p>
                      <p className="text-sm text-gray-400">Tournaments Won</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">{player.nftCollections}</p>
                      <p className="text-sm text-gray-400">NFTs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">{player.earnings}</p>
                      <p className="text-sm text-gray-400">Total Earnings</p>
                    </div>
                  </div>
                </div>
              ))}
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

export default LeaderBoard;