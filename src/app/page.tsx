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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Arial',
    ].join(','),
  },
});

type TestUser = {
  name: string;
  birthday: string;
  age: number;
}

type Params = Record<'numOfTestUsers', string>;

export default function Home() {
  const [testUsers, setTestUsers] = useState<Array<TestUser> | null>(null);
  const [numOfTestUsers, setNumOfTestUsers] = useState<number>(1);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const params_object: Params = {
    numOfTestUsers: numOfTestUsers.toString()
  };

  const params: string = new URLSearchParams(params_object).toString();

  const getData = async ():  Promise<void> => {
    const res = await fetch(apiUrl + 'generate_test_users/?' + params);
    if (!res.ok) {
      throw new Error('データ取得に失敗しました');
    }
    const data = await res.json();
    setTestUsers(data);
  }

  const handleChange = (event: SelectChangeEvent<number>) => {
    setNumOfTestUsers(event.target.value as number);
  };

  return (
    <ThemeProvider theme={theme}>
      <main className={styles.main}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-small-label">人数</InputLabel>
          <Select
            labelId="select-small-label"
            id="select-small"
            value={numOfTestUsers}
            label="人数"
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        { testUsers && 
          <TableContainer sx={{ mt: 4, maxWidth: 400 }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 80, fontSize: 16, fontWeight: 'bold' }}>氏名</TableCell>
                  <TableCell sx={{ width: 80, fontSize: 16, fontWeight: 'bold' }}>生年月日</TableCell>
                  <TableCell sx={{ width: 8, fontSize: 16, fontWeight: 'bold' }}>年齢</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              { testUsers.map((testUser, index) => 
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: 16 }}>{testUser.name}</TableCell>
                  <TableCell sx={{ fontSize: 16 }}>{testUser.birthday}</TableCell>
                  <TableCell sx={{ fontSize: 16 }}>{testUser.age}</TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
          </TableContainer>
        }
        <Button sx={{ mt: 4 }} variant="contained" type="submit" onClick={getData}>生成</Button>
      </main>
    </ThemeProvider>
  )
}
