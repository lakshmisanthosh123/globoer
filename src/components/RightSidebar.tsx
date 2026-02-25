"use client";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
const Wrapper = styled(Box)({
  width: 250,
  padding: 20,
});
const cards = [
  {
    imgSrc: "/images/img1.jpg",
    title: "International Guideline",
    description:
      "COVID safety measures adopted by various countries including VISA restrictions, quarantine rules, etc.",
    buttonText: "View guidelines",
    buttonLink: "#",
  },
  {
    imgSrc: "/images/img2.jpg",
    title: "We’ve found you a great deal!",
    description:
      "Get more, spend less with up to $575 off when you book your flight + stay together.",
    buttonText: "Shop flight",
    buttonLink: "#",
  },

  {
    imgSrc: "/images/img3.jpg",
    title: "We’ve found you a great deal!",
    description:
      "Get more, spend less with up to $575 off when you book your flight + stay together.",
    buttonText: "Shop flight",
    buttonLink: "#",
  },
];
export default function RightSidebar() {
  return (
    <Wrapper>
      <Typography variant="h6">Special Offers</Typography>
      <div className="flex flex-col gap-6 max-w-sm mx-auto">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="border rounded-lg shadow-sm overflow-hidden"
          >
            <Image
              src={card.imgSrc}
              alt={card.title}
              width={300}
              height={180}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{card.description}</p>
              <a
                href={card.buttonLink}
                className="inline-block px-4 py-2 border border-purple-500 text-purple-500 rounded hover:bg-purple-50"
              >
                {card.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
