"use client" ;
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ficofiLogo from "/public/FICOFI_Community.svg"
import loader from "/public/loader.svg"

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://ficofi-community-backend.azurewebsites.net/proofs",
        { headers: {"Authorization" : `Basic Zmljb2ZpOjNibWVpYTc0TzFOdA==`} }
      );
      setLoading(false)
      setData(result.data);
    };
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <main className={styles.main}>
        <header className={styles.header}>
          <Image 
            src={ficofiLogo}
            width={225}
            height={75}
            alt="FICOFI Community" />
        <h1 className={styles.subtitle}>Proofs of consumption</h1>
        </header>
        <Image 
              src={loader}
              width={100}
              height={100}
              className={styles.loader}
              alt="FICOFI Community" />
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Image 
              src={ficofiLogo}
              width={225}
              height={75}
              alt="FICOFI Community" />
        <h1 className={styles.subtitle}>Proofs of consumption</h1>
      </header>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Order</th>
            <th>Item</th>
            <th className={styles.centerAlign}>Date</th>
            <th>Customer</th>
            <th>Community</th>
            <th>Photos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.proof_id} className={styles.tr}>
              <td><pre>{item.order_id}</pre></td>
              <td><p><pre>{item.item_id}</pre></p><p>{item.name_en} <strong>{item.vintage}</strong></p></td>
              <td className={styles.centerAlign}><p>{new Date(item.timestamp).toLocaleString().split(" ")[0]}</p><p>{new Date(item.timestamp).toLocaleString().split(" ")[1]}</p></td>
              <td><p><strong>{item.customer_id}</strong></p><p>{item.name}</p></td>
              <td><p><strong>{item.community_code}</strong></p><p>{item.community_name}</p></td>
              <td>{
                item.filenames.split(";").map(element => {
                  return  <Link href={`https://ficoficlientsazurec96aa.blob.core.windows.net/ficofi-proofs-of-consumption/${item.proof_id}/${element}`} key="link">
                    <img
                      src={`https://ficoficlientsazurec96aa.blob.core.windows.net/ficofi-proofs-of-consumption/${item.proof_id}/${element}`}
                      width={80}
                      height={100}
                      alt="Proof of consumption"
                    />
                  </Link>
                })
            }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
