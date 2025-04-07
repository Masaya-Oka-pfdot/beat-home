'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
export default function Home() {
  return (
      <main style={{ textAlign: 'center', padding: '50px' }}>
      <h1>京大名大開発部 政治参加プロジェクト</h1>
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
