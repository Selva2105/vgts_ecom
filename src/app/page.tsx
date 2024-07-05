import { StoreProvider } from "@/context/StoreContext";
import Categories from "./categories/page";

export default function Home() {
  return (
    <>
      <StoreProvider>
        <Categories />
      </StoreProvider>
    </>
  );
}
