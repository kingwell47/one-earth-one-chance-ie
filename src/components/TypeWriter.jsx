import React, { useState } from "react";

function typeSentence(sentence, setSentence) {
  for (let i = 0; i < sentence.length; i++) {
    setTimeout(() => {
      setSentence(sentence.slice(0, i + 1));
    }, i * 50);
  }
}

function TypeWriter({ content }) {
  const [sentence, setSentence] = useState("");

  React.useEffect(() => {
    const sentences = content;
    sentences.forEach((e) => {
      typeSentence(e, setSentence);
    });
  }, []);

  return (
    <div>
      <p>{sentence}</p>
    </div>
  );
}

export default TypeWriter;
