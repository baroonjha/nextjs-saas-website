import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
// import illustration from "public/illustration.png";
import { cache } from "swr/_internal";

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const blog = async () => {
  const data = await getData();
  console.log(data);
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <Link href={`/blog/${item.id}`} className={styles.item} key={item.id}>
          <div className={styles.imgContainer}>
            <Image
              src={item.img}
              alt="image"
              className={styles.image}
              fill={true}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default blog;
