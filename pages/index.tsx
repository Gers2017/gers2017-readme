import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { GetStaticProps } from "next";
import axios from "axios";
import { useEffect, useRef } from "react";
export const getStaticProps: GetStaticProps = async () => {
  let card = null;
  try {
    const { data } = await axios.get(
      `${process.env.HOSTNAME}/api/card?username=Gers2017`
    );
    card = data;
  } catch (e) {
    card = `<h1>Whoops better check the logs</h1>`;
    console.error(e);
  }
  return {
    props: {
      card,
    },
  };
};

export default function Home({ card }: { card: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardRef.current.innerHTML = card;
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div ref={cardRef}></div>
      </main>
    </div>
  );
}
