import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  return <>{children}</>;
}
