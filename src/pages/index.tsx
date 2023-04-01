import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crex | Crowdfund climate projects</title>
        <meta
          name="description"
          content="Crowdfunding platform for climate projects"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col">
        <nav className="px-8 py-6">
          <div className="font-heading text-xl text-gray-50 ">
            CreX | Crowdfund climate projects{" "}
          </div>
        </nav>
        <div>
          <section className="relative gap-8 md:grid md:grid-cols-2 lg:grid-cols-5">
            <Image
              className="h-72 w-full object-cover object-center md:hidden"
              alt="Solar sun energy"
              width="75"
              height="75"
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            />
            <div className="mx-auto my-12 flex max-w-md flex-col md:ml-4 md:max-w-sm lg:col-span-2 lg:mx-auto">
              <h1 className="mt-8 font-heading text-6xl leading-snug text-secondary lg:text-7xl lg:leading-snug ">
                Crowdfund climate projects
              </h1>
              <p className="mt-8 font-body text-lg text-gray-50">
                The climate is on fire and you can help! Crowdfund carbon
                removal projects and get future carbon credits to support
                projects from around the world.
              </p>
              <div className="mt-8 flex flex-row gap-4">
                <a
                  href="https://forms.gle/v5MZhi4pvoCLMyfa7"
                  className="text-body transform rounded px-4 py-3 text-secondary outline outline-1 outline-secondary/[.65] transition hover:-translate-y-1 hover:outline-2 active:bg-secondary/[.55]"
                >
                  Apply for funding
                </a>
                <Link
                  href="/projects"
                  className="text-body transform rounded bg-secondary px-6 py-3 text-gray-800 transition hover:-translate-y-1 hover:bg-secondary/[.95] active:bg-secondary/[.55]"
                >
                  Browse projects
                </Link>
              </div>
            </div>
            <Image
              className="hidden h-full w-full object-cover object-center md:block lg:col-span-3"
              alt="Solar sun energy"
              width="75"
              height="75"
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            />
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
