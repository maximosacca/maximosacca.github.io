import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

export function TypingText({
  words = ["Hello", "World", "Typing", "Effect"],
  typingSpeed = 150,
  deleteSpeed = 100,
  delayBetweenWords = 1000,
  className = "typing-text",
  cursorClassName = "typing-cursor",
  cursorChar = "|",
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !words || !words.length) return;
    const word = words[currentWordIndex];

    if (isDeleting) {
      if (currentText === "") {
        const timer = setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, deleteSpeed);

        return () => clearTimeout(timer);
      }

      const timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length - 1));
      }, deleteSpeed);
      return () => clearTimeout(timer);
    }

    if (currentText === word) {
      const timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentText(word.substring(0, currentText.length + 1));
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    words,
    typingSpeed,
    deleteSpeed,
    delayBetweenWords,
    shouldReduceMotion,
  ]);

  const displayText = shouldReduceMotion ? (words?.[0] ?? "") : currentText;

  return (
    <span className={className} aria-label={words?.[0]}>
      {displayText}
      <motion.span
        aria-hidden="true"
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0, 1] }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }
        }
        className={cursorClassName}
      >
        {cursorChar}
      </motion.span>
    </span>
  );
}
