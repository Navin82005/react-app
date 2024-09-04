import "./assets/fonts/fonts";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";

function App() {
  return (
    <div className="App" style={{ fontFamily: "montserrat" }}>
      <Header />
      <SideBar />
    </div>
  );
}

// import React from 'react';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App(){
//   const notify = () => toast("Wow so easy!");

//   return (
//     <div>
//       <button onClick={notify}>Notify!</button>
//       <ToastContainer />
//     </div>
//   );
// }

// import toast, { Toaster } from 'react-hot-toast';

// const notify = () => toast('Here is your toast.');

// const App = () => {
//   return (
//     <div>
//       <button onClick={notify}>Make me a toast</button>
//       <Toaster />
//     </div>
//   );
// };

// import { Button } from 'flowbite-react';
// import { SnackbarProvider, enqueueSnackbar, useSnackbar } from 'notistack';

// const MyButton = () => {
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   return <Button onClick={() => enqueueSnackbar('I love hooks')}>Show snackbar</Button>;
// };

// const App = () => {
//   return (
//     <div>
//       <SnackbarProvider>
//         <button onClick={() => enqueueSnackbar('That was easy!')}>Show snackbar</button>
//         <MyButton />
//       </SnackbarProvider>
//     </div>
//   );
// };

export default App;
