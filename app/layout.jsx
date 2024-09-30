
import "@styles/globals.css";
import { Providers } from "./providers";

export const metadata = {
    title: 'Contextualizer',
    description: 'A simple app to help you contextualize your thoughts',
}


const RootLayout = ({children}) =>{
  return (
    <html lang='en'>
      <body>
        <Providers>
          <main className='bg-slate-950 text-white min-h-screen'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
};

export default RootLayout;
