import CounterProvider from "./_components/CounterProvider";
import TabProvider from "./_components/TabProvider";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  return <TabProvider>{children}</TabProvider>;
}
