import { NextPage } from "next";
import Head from "next/head"
import favicon from '../assets/images/favicon-32x32.png';

import { GetServerSideProps } from "next";

import Thread from "../components/Thread";
import dataJSON from '../data.json';

import { Data } from "../TypesAndInterfaces";



const Home:NextPage<{data:Data}> = ({data}) =>{

  
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
        <link rel="icon" type="image/png" sizes="32x32" href={favicon.src}/>
        <title>Frontend Mentor | Interactive comments section</title>
      </Head>
      <main>
        {
          data.comments.map((thread) => (
            <Thread 
              key={thread.content}
              data={thread}/>
          ))
        }
      </main>
    </>
  )
}

export default Home;




export const getServerSideProps:GetServerSideProps<{data: Data}> = async () => {
  return {
    props: {
      data: dataJSON
    }
  }
}
