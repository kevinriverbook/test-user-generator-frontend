"use client";

import styles from './page.module.css';
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Arial',
    ].join(','),
  },
});

const columns = [
  { id: 'column1', label: 'Column 1', width: 100 },
  { id: 'column2', label: 'Column 2', width: 100 },
];


type TestUser = {
  name: string
  birthday: string
}

export default function Home() {
  const [testUsers, seTestUsers] = useState<TestUser | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getData = async ():  Promise<void> => {
    const res = await fetch(apiUrl + 'generate_test_users');
    if (!res.ok) {
      throw new Error('データ取得に失敗しました');
    }
    const data = await res.json();
    seTestUsers(data);
  }

  return (
    <ThemeProvider theme={theme}>
      <main className={styles.main}>
        { testUsers && 
          <TableContainer sx={{ maxWidth: 400 }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 40, fontSize: 16, fontWeight: 'bold' }}>氏名</TableCell>
                  <TableCell sx={{ width: 40, fontSize: 16, fontWeight: 'bold' }}>生年月日</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontSize: 16 }}>{testUsers.name}</TableCell>
                  <TableCell sx={{ fontSize: 16 }}>{testUsers.birthday}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        }
        <Button  sx={{ mt: 4 }} variant="contained" type="submit" onClick={getData}>生成</Button>
      </main>
    </ThemeProvider>
  )
}
