"use client";

import Image from 'next/image'
import styles from './page.module.css'
import React, { useState } from 'react';

type TestUser = {
  name: string
}

export default function Home() {
  const [testUsers, seTestUsers] = useState<TestUser | null>(null);

  const getData = async ():  Promise<void> => {
    const res = await fetch('http://localhost:3001/api/v1/generate_test_users/generate_test_users');
    if (!res.ok) {
      throw new Error('データ取得に失敗しました');
    }
    const data = await res.json();
    seTestUsers(data);
  }

  return (
    <main>
      { testUsers && <p>{testUsers.name}</p> }
      <button type="submit" onClick={getData}>生成</button>
    </main>
  )
}
