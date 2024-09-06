import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import classNames from "classnames";
import Link from "next/link";

type Props = {
  className?: string;
};

export function Menu({ className }: Props) {
  const { connected } = useWallet();
  const menuClasses = classNames("menu", className);

  return (
    <ul className={menuClasses}>
      {connected && (
        <>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </>
      )}
      <WalletMultiButton className="btn mt-4" />
    </ul>
  );
}
