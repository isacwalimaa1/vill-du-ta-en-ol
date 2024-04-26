import { useState } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "Nej",
      "Är du säker?",
      "Om jag frågar snällt?",
      "Snälla <3",
      ":((((",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = () => {
    fetch('https://phonefunctionapp.azurewebsites.net/api/Function1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shouldSendSMS: true
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from Azure Function:', data);
      // Display the "WOOOO" message
    })
    .catch(error => {
      console.error('Error calling Azure Function:', error);
    });
  
    // Set yesPressed to true regardless of the fetch result
    setYesPressed(true);
  };

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center">
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="bear gif" />
          <div className="my-4 text-4xl font-bold">WOOOOOO!!! ;))</div>
        </>
      ) : (
        <>
          <img
            className="h-[200px]"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
            alt="love bear gif"
          />
          <h1 className="my-4 text-4xl">Vill du ta en öl med mig?</h1>
          <div className="flex items-center">
            <button
              className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700`}
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick} // Call handleYesClick instead of setYesPressed(true)
            >
              Ja
            </button>
            <button
              onClick={handleNoClick}
              className=" rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {noCount === 0 ? "Nej" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
