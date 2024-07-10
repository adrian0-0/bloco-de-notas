// "use client";

// import React, { useState, useCallback, useMemo } from "react";

// export default function App() {
//   const [count, setCount] = useState(0);

//   const increment = useCallback(() => {
//     setCount(count + 1);
//     console.log("teste");
//   }, [count]);

//   return (
//     <div>
//       Count: {count}
//       <button onClick={increment}>Increase</button>
//     </div>
//   );
// }

//USE MEMO
// "use client";

// import React, { useState, useCallback, useMemo } from "react";

// export default function App() {
//   const [count, setCount] = useState(0);

//   const increment = useMemo(() => {
//  setCount(count + 1);
//     console.log("teste");
//   }, [count]);

//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>Increase</button>
//     </div>
//   );
// }
