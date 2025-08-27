import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";


const sections = [
  {
    leftLabel: "Real Madrid",
    title: <>Real Madrid</>,
    rightLabel: "Real Madrid",
    background: "https://i.pinimg.com/1200x/1c/79/da/1c79da920d6ad651c10153af389a5f99.jpg",
    audioSrc: "/sfx/click-01.mp3",
  },
  {
    leftLabel: "Liverpool",
    title: <>Liverpool</>,
    rightLabel: "Liverpool",
    background: "https://i.pinimg.com/1200x/19/e0/3c/19e03c3e8fe418f1a07d1916cb66e09d.jpg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "Chelsea",
    title: <>Chelsea</>,
    rightLabel: "Chelsea",
    background: "https://i.pinimg.com/1200x/50/15/0c/50150c79fc6774d23812bf12ddf53639.jpg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "Juventus",
    title: <>Juventus</>,
    rightLabel: "Juventus",
    background: "https://i.pinimg.com/1200x/29/bf/83/29bf83632e3f275d2088e37aebcf0a05.jpg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: "PSG",
    title: <>PSG</>,
    rightLabel: "PSG",
    background: "https://i.pinimg.com/1200x/0a/fd/fd/0afdfda2e37d76483c097b08530ff08a.jpg",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  // ...
];

export default function CategoriesTeam() {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  return (
    <>
      <FullScreenScrollFX
        sections={ sections }
        header={<><div>SHOP BY TEAMS</div><div></div></>}
        footer={<div>WEAR YOUR PASSION</div>}
        showProgress
        durations={{ change: 0.7, snap: 800 }}
      />
    </>
  );
}