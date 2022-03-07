import styles from "../styles/Home.module.css";
import { useEffect, useRef } from "react";
import useSwr from "swr";

const fetcher = (url) => fetch(url).then((res) => res.text());
export default function Home() {
  const { data, error } = useSwr("/api/card?username=Gers2017", fetcher);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      cardRef.current.innerHTML = data;
    }
  }, [data]);

  if (error) return <div>Failed to load the card</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div ref={cardRef}></div>
      </main>
    </div>
  );
}
