"use client"
import React from 'react'
import { Provider } from "react-redux";
import { store } from "@/components/hooks/redux/store";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}