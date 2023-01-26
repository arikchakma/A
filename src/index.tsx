import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  Box,
  ChakraProvider,
  Grid,
  GridItem,
  Center,
  chakra
} from "@chakra-ui/react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import people from "./people";
import "./styles.css";

const MotionGrid = motion(Grid);
const MotionVideo = motion(chakra("video"));

const GRID_AREAS = "abcdefgh";

const VideoGrid = () => {
  const { scrollYProgress } = useScroll();

  const spring = useSpring(scrollYProgress, { mass: 0.1, restDelta: 0.0001 });

  const rotate = useTransform(spring, (progress) => progress * 270 + "deg");
  const inverseRotate = useTransform(
    spring,
    (progress) => -progress * 270 + "deg"
  );
  const scale = useTransform(spring, (progress) => 1 + progress * 2);

  return (
    <Center pos="fixed" inset={0} overflow="hidden">
      <MotionGrid
        templateAreas={`
        ". a a a a . . . ."
        ". a a a a b b . ."
        ". a a a a b b . ."
        "c c c d d d e e ."
        "c c c d d d e e ."
        "c c c d d d f f f"
        ". g g h h h f f f"
        ". g g h h h f f f"
        ". . . h h h . . ."
        ". . . h h h . . ."
        `}
        gridTemplateColumns={"repeat(9, 6vh)"}
        gridTemplateRows={"repeat(10, 6vh)"}
        gap={2}
        transformOrigin="50% 45%"
        style={{ rotate, scale }}
      >
        {people.map((person, index) => (
          <GridItem
            key={person.name}
            area={GRID_AREAS[index]}
            rounded="xl"
            overflow="hidden"
            transform="translateZ(0)"
          >
            <MotionVideo
              w="100%"
              h="100%"
              src={person.video}
              objectFit="cover"
              autoPlay
              // playsInline // mobile devices can't handle it
              loop
              muted
              style={{ rotate: inverseRotate, scale: 1.725 }}
            />
          </GridItem>
        ))}
      </MotionGrid>
    </Center>
  );
};

function App() {
  return (
    <Box h="400vh">
      <VideoGrid />
    </Box>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
