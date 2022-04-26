import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import useSwr from "swr";

const fetcher = (url) => fetch(url).then((res) => res.text());
export default function Home() {
  const [theme, setTheme] = useState("glitch");
  const url = `/api/card?username=Gers2017&cache_seconds=1440&theme=${theme}`;
  const { data, error } = useSwr(url, fetcher);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      cardRef.current.innerHTML = data;
    }
  }, [data]);

  if (error) return <div>Failed to load the card</div>;
  if (!data)
    return (
      <div className={styles.main}>
        <div className="spin"></div>
      </div>
    );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div ref={cardRef}></div>
        <select
          name="themes"
          id="themes"
          value={theme}
          onChange={(e) => {
            setTheme(e.target.value);
          }}
        >
          <option value="glitch">Glitch</option>
          <option value="vscode">Vscode</option>
          <option value="dracula">Dracula</option>
          <option value="spectrum">Spectrum</option>
        </select>
      </main>
    </div>
  );
}
