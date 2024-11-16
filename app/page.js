"use client";
import styles from "./page.module.css";
import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";
import ficofiLogo from "/public/FICOFI_Community.svg"
import loader from "/public/loader.svg"

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        // TODO replace prd url
        "https://ficofi-community-backend.azurewebsites.net/register-list",
        // "https://ficofi-community-backend-dev-f3c9eabeb5akcsb4.southeastasia-01.azurewebsites.net/register-list",
        {headers: {"Authorization": `Basic Zmljb2ZpOjNibWVpYTc0TzFOdA==`}}
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
            alt="FICOFI Community"/>
          <h1 className={styles.subtitle}>Event registration</h1>
        </header>
        <Image
          src={loader}
          width={100}
          height={100}
          className={styles.loader}
          alt="FICOFI Community"/>
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
          alt="FICOFI Community"/>
        <h1 className={styles.subtitle}>Event registration</h1>
      </header>
      <table className={styles.table}>
        <thead className={styles.thead}>
        <tr>
          <th>Event</th>
          <th>Customer Name</th>
          <th>Customer Dietary Restrictions</th>
          <th>Guest Name</th>
          <th>Guest Dietary Restrictions</th>
          <th>Additional Notes</th>
          <th className={styles.centerAlign}>Date</th>
        </tr>
        </thead>
        <tbody>
        {data.map((item) => (
          <tr key={item.register_id} className={styles.tr}>
            <td>
              <pre>{item.event_name}</pre>
            </td>
            <td><p>{item.customer_name}</p></td>
            <td><p>{item.customer_dietary_restrictions}</p></td>
            <td><p>{item.guest_name}</p></td>
            <td><p>{item.guest_dietary_restrictions}</p></td>
            <td><p>{item.notes}</p></td>
            <td className={styles.centerAlign}><p>{new Date(item.timestamp).toLocaleString().split(" ")[0]}</p>
              <p>{new Date(item.timestamp).toLocaleString().split(" ")[1]}</p></td>
          </tr>
        ))}
        </tbody>
      </table>
    </main>
  );
}
