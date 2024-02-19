"use client";
import { useRef } from "react";
import { Stack, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import { isEmpty, some } from "lodash";
import axios from "axios";
import useSWR from "swr";

export default function Home() {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const { data, mutate } = useSWR("/api/posts", (url) => axios.get(url).then((res) => res.data));
  const list: Array<Record<string, string>> = data ?? [];
  console.log({ data });

  const handleSave = async () => {
    let payload;
    if (inputRef1.current?.value && inputRef2.current?.value) {
      console.log(inputRef1.current.value);
      payload = {
        title: inputRef1.current.value,
        description: inputRef2.current.value,
      };
      console.log(payload);
    } else {
      throw new Error("Invalid input");
    }

    try {
      const data = await axios.post("/api/posts", payload);
      console.log({ data });
      mutate();
    } catch (error) {
      throw error;
    }
  };
  return (
    <Stack gap={2} width="20%" alignItems="center" justifyContent="center" sx={{ width: "100vw", height: "100vh" }}>
      <TextField inputRef={inputRef1} id="title" label="title" variant="outlined" />
      <TextField inputRef={inputRef2} id="description" label="description" variant="filled" />
      <Button variant="contained" onClick={handleSave}>
        post
      </Button>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {list.map((item, key) => (
          <ListItem key={key}>
            <ListItemText primary={item.title} secondary={item.description} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
