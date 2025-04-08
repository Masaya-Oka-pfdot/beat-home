'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
export default function Home() {
  return (
      <main style={{ textAlign: 'center', padding: '50px' }}>
      <h1>京台名大政治参加pj</h1>
      <p>クイズをやってみよう!</p>
      <Link href="/quiz">
        <button style={{
          marginTop: '20px',
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#0055aa',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          政治クイズを始める
        </button>
         </Link>
      <p>あなたに合った政党を診断してみよう！</p>
      <Link href="/match">
        <button style={{
          marginTop: '20px',
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#0055aa',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          政党マッチング診断を始める
        </button>
      </Link>
      </main>
   
  );
}
