import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { fetcher, useDataFetch } from "@utils/use-data-fetch";
import { ItemList } from "@components/home/item-list";
import { ItemData } from "@components/home/item";
import { Button, ButtonState } from "@components/home/button";
import { toast } from "react-hot-toast";
import { Transaction } from "@solana/web3.js";
import { SignCreateData } from "@pages/api/sign/create";
import { SignValidateData } from "@pages/api/sign/validate";
import Link from "next/link";

export function HomeContent({onTransact}: {onTransact: Function}) {
  const { publicKey, signTransaction } = useWallet();
  const [signState, setSignState] = useState<ButtonState>("initial");
  const { data, error } = useDataFetch<Array<ItemData>>(
    publicKey && signState === "success" ? `/api/items/${publicKey}` : null
  );
  const prevPublicKey = React.useRef<string>(publicKey?.toBase58() || "");

  // Reset the state if wallet changes or disconnects
  React.useEffect(() => {
    if (publicKey && publicKey.toBase58() !== prevPublicKey.current) {
      prevPublicKey.current === publicKey.toBase58();
      setSignState("initial");
    }
  }, [publicKey]);

  // This will request a signature automatically but you can have a separate button for that
  React.useEffect(() => {
    // async function sign() {
    //   if (publicKey && signTransaction && signState === "initial") {
    //     setSignState("loading");
    //     const signToastId = toast.loading("Signing message...");
    //     try {
    //       // Request signature tx from server
    //       const { tx: createTx } = await fetcher<SignCreateData>(
    //         "/api/sign/create",
    //         {
    //           method: "POST",
    //           body: JSON.stringify({
    //             publicKeyStr: publicKey.toBase58(),
    //           }),
    //           headers: { "Content-type": "application/json; charset=UTF-8" },
    //         }
    //       );
    //       const tx = Transaction.from(Buffer.from(createTx, "base64"));
    //       // Request signature from wallet
    //       const signedTx = await signTransaction(tx);
    //       // Validate signed transaction
    //       await fetcher<SignValidateData>("/api/sign/validate", {
    //         method: "POST",
    //         body: JSON.stringify({
    //           signedTx: signedTx.serialize().toString("base64"),
    //         }),
    //         headers: { "Content-type": "application/json; charset=UTF-8" },
    //       });
    //       setSignState("success");
    //       toast.success("Message signed", { id: signToastId });
    //     } catch (error: any) {
    //       setSignState("error");
    //       toast.error("Error verifying wallet, please reconnect wallet", {
    //         id: signToastId,
    //       });
    //     }
    //   }
    // }
    // sign();
  }, [signState, signTransaction, publicKey]);

  const hasFetchedData = publicKey && signState === "success" && data;

  // Prize Pool Component
  const PrizePoolUI = () => {
    const [prizeType, setPrizeType] = useState("player-funded");
    const [entryFee, setEntryFee] = useState("");
    const [sponsor, setSponsor] = useState("");
    const [prizeAmount, setPrizeAmount] = useState("");
    const [nftPrize, setNftPrize] = useState(false);
    const [nftDetails, setNftDetails] = useState("");

    const handlePrizeTypeChange = (e: any) => {
      setPrizeType(e.target.value);
    };

    const handleFormSubmit = (e: any) => {
      e.preventDefault();
      const formData = {
        prizeType,
        entryFee,
        sponsor,
        prizeAmount,
        nftPrize,
        nftDetails,
      };
      console.log("Prize Pool Data:", formData);
      // Handle logic for form submission
    };

    return (
      <div className="flex flex-col items-center min-h-screen  py-8">
        {/* Prize Pool Setup Form */}
        <div className="mt-8 max-w-xl w-full p-6  shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Prize Pool Setup</h2>
          <form onSubmit={handleFormSubmit}>
            {/* Prize Type Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Prize Pool Type
              </label>
              <select
                value={prizeType}
                onChange={handlePrizeTypeChange}
                className="w-full mt-2 p-2 border rounded  "
              >
                <option value="player-funded">Player-Funded</option>
                <option value="sponsor-funded">Sponsor-Funded</option>
                <option value="platform-funded">Platform-Funded</option>
                <option value="nft-prize">NFT Prize</option>
              </select>
            </div>

            {/* Entry Fee for Player-Funded */}
            {prizeType === "player-funded" && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Entry Fee
                </label>
                <input
                  type="number"
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                  className="w-full p-2 border rounded  "
                  placeholder="Set entry fee in tokens or USD"
                />
              </div>
            )}

            {/* Sponsor Name for Sponsor-Funded */}
            {prizeType === "sponsor-funded" && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Sponsor
                </label>
                <input
                  type="text"
                  value={sponsor}
                  onChange={(e) => setSponsor(e.target.value)}
                  className="w-full p-2 border rounded  "
                  placeholder="Enter sponsor name"
                />
              </div>
            )}

            {/* Prize Amount for Sponsor or Platform Funded */}
            {(prizeType === "sponsor-funded" ||
              prizeType === "platform-funded") && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Prize Amount
                </label>
                <input
                  type="number"
                  value={prizeAmount}
                  onChange={(e) => setPrizeAmount(e.target.value)}
                  className="w-full p-2 border rounded  "
                  placeholder="Enter prize amount"
                />
              </div>
            )}

            {/* NFT Prize Details */}
            {prizeType === "nft-prize" && (
              <div className="mb-4">
                <label className="inline-flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={nftPrize}
                    onChange={() => setNftPrize(!nftPrize)}
                    className="mr-2"
                  />
                  Include NFT as part of the prize
                </label>
                {nftPrize && (
                  <textarea
                    value={nftDetails}
                    onChange={(e) => setNftDetails(e.target.value)}
                    className="w-full p-2 border rounded  "
                    placeholder="Describe the NFT prize"
                  />
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-success text-white px-4 py-2 rounded"
              >
                Save Prize Pool
              </button>
            </div>
          </form>
        </div>
        {/* Main Grid with Prize Pool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Global Esports Fund",
              amount: "Up to 50k USDC",
              link: "#",
            },
            {
              title: "Champion’s Battle Grant",
              amount: "Up to 25k USDC",
              link: "#",
            },
            {
              title: "Elite Gamer Sponsorship",
              amount: "Up to 10k USDC",
              link: "#",
            },
            {
              title: "Pro League Fund",
              amount: "Up to 15k JUP",
              link: "#",
            },
            {
              title: "Ultimate Victory Fund",
              amount: "Up to 20k DRIFT",
              link: "#",
            },
            {
              title: "Legends of the Arena",
              amount: "Up to 30k USDC",
              link: "#",
            },
            {
              title: "Rising Star Fund",
              amount: "Up to 5k USDC",
              link: "#",
            },
            {
              title: "Pro Circuit Support",
              amount: "Up to 12k USDC",
              link: "#",
            },
            {
              title: "Ultimate Team Battle Grant",
              amount: "Up to 7k USDC",
              link: "#",
            },
            {
              title: "Master League Prize",
              amount: "Up to 20k USDC",
              link: "#",
            },
            {
              title: "Epic Showdown Fund",
              amount: "Up to 18k USDC",
              link: "#",
            },
            {
              title: "Champion’s Glory Sponsorship",
              amount: "Up to 15k USDC",
              link: "#",
            },
          ].map((grant, idx) => (
            <div
              key={idx}
              className=" p-4 rounded-lg shadow-lg flex flex-col items-start"
            >
              <h3 className="text-lg font-bold mb-2">{grant.title}</h3>
              <p className="text-sm text-gray-400">{grant.amount}</p>
              <a
                href={grant.link}
                className="mt-4 bg-success text-white py-2 px-4 rounded"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };


  // DAO Voting Page Component
  const DAOVotingPage = ({onTransact}: { onTransact: Function} ) => {
    const [proposals, setProposals] = useState([
      {
        title: "Rule Change: Increase Prize Pool Distribution",
        description:
          "Vote on changing the prize distribution structure to give more rewards to lower-placed participants.",
        options: ["Yes", "No"],
      },
      {
        title: "Dispute: Team X vs Team Y in Tournament ABC",
        description:
          "Vote on the dispute regarding rule violation in the finals of Tournament ABC.",
        options: ["Team X Wins", "Team Y Wins", "Rematch"],
      },
    ]);

    return (
      <div className="dao-voting-page flex flex-col items-center min-h-screen  py-8">
        <h2 className="text-3xl font-semibold mb-6">DAO Voting</h2>

        {/* Proposals */}
        <div className="w-full max-w-5xl">
          {proposals.map((proposal, idx) => (
            <div key={idx} className=" p-4 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-bold mb-2">{proposal.title}</h3>
              <p className="text-gray-400 mb-4">{proposal.description}</p>

              {/* Voting Options */}
              <div className="flex space-x-4">
                {proposal.options.map((option, optionIdx) => (
                  <button
                    key={optionIdx}
                    onClick={onTransact({
                      address: "BcTcHHKAHJTgApbDMuyJKNBeDgtgoMuD6vGhSUuEPJAK",
                      amount: "0.0001"
                    })}
                    className="bg-success text-white px-4 py-2 rounded "
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  return (
    <>
      <div className="flex min-h-screen  ">
        {/* Sidebar */}
        <div className="w-1/4  p-4">
        <Link
        href='/create'
        className="mt-4 bg-success w-full text-white py-2 px-4 rounded"
      >
        Create
      </Link>
          <h2 className="text-xl font-bold mb-4 mt-4">Upcoming Tournaments</h2>
          <ul className="space-y-4">
            {[
              "CSGO",
              "DOTA 2",
              "Fortnite",
              "Call of Duty",
              "Apex Legends",
              "Valorant",
              "League of Legends",
            ].map((game, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{game}</p>
                  <p className="text-xs text-gray-400">Starts in 16 hours</p>
                </div>
                <p className="font-bold text-success">8 SOL</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6">
          {/* Featured Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://www.inoru.com/img/web3-gaming-studio/banner-img.webp"
                alt="Tournament Banner"
              />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-3xl font-bold">
                  Greyhound Gaming vs Rabbitohs
                </h2>
                <p className="text-sm text-gray-300">
                  It is a long established fact that a reader will be
                  distracted.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                className="w-full h-64 object-cover rounded-lg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdj3GvIjQuhaVCuHvP-h4UeeoE1W0izzCIvA&s"
                alt="Tournament Banner"
              />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-3xl font-bold">DOTA 2 Championship</h2>
                <p className="text-sm text-gray-300">
                  It is a long established fact that a reader will be
                  distracted.
                </p>
              </div>
            </div>
          </div>

          {/* Tournament List */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Tournaments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Fortnite",
                "CSGO",
                "Call of Duty",
                "Valorant",
                "PUBG",
                "Rocket League",
              ].map((tournament, idx) => (
                <div
                  key={idx}
                  className=" p-4 rounded-lg hover:bg-gray-700 transition"
                >
                  <h3 className="text-lg font-bold mb-2">{tournament}</h3>
                  <p className="text-sm text-gray-400">Tuesday Night Fight</p>
                  <p className="text-sm text-gray-400">2v2 G4 Teams</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-success font-bold">4.00 SOL</p>
                    <button className="bg-success text-white text-sm py-1 px-4 rounded">
                      Enter Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Prize Pool Section */}
      <div className="mt-8">
        <PrizePoolUI />
      </div>

      {/* NFT Section */}
      <div className="mt-8 grid grid-cols-1">
        {hasFetchedData ? (
          <div>
            <ItemList items={data} />
          </div>
        ) : (
          <div className="text-center">
            {!publicKey && (
              <div className="card border-2 border-primary mb-5">
                <div className="card-body items-center">
                  <h2 className="card-title text-center text-primary mb-2">
                    Please connect your wallet to get a list of your NFTs
                  </h2>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* DAO Voting Page */}
      <DAOVotingPage onTransact={onTransact} />
    </>
  );
}
