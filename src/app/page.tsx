"use client";

import Image from 'next/image'
import styles from './page.module.css'
import React, { useState } from 'react';

type TestUser = {
  name: string
  birthday: string
}

export default function Home() {
  const [testUsers, seTestUsers] = useState<TestUser | null>(null);

  const getData = async ():  Promise<void> => {
    const res = await fetch('http://localhost:3001/api/v1/generate_test_users/');
    if (!res.ok) {
      throw new Error('データ取得に失敗しました');
    }
    const data = await res.json();
    seTestUsers(data);
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}年${month}月${day}日`;

    return formattedDate
  }

  return (
    <main>
      { testUsers && 
        <table>
          <thead>
            <tr>
              <th>氏名</th>
              <th>生年月日</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{testUsers.name}</td>
              <td>{formatDate(testUsers.birthday)}</td>
            </tr>
          </tbody>
        </table>
      }
      <button type="submit" onClick={getData}>生成</button>
    </main>
  )
}
